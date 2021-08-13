const history = {
  redolist: [],
  init(canvas) {
    this.autosave = this.autosave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.canvas = canvas;

    // Clear localStorage
    localStorage.setItem("autosave", JSON.stringify([this.canvas]));

    this.canvas.on({
      "object:modified": this.autosave,
      "object:added": this.autosave,
      "object:removed": this.autosave,
    });
  },
  get() {
    return JSON.parse(localStorage.getItem("autosave")) || [];
  },
  getCurrent() {
    return this.get().pop();
  },
  add(state) {
    state = state || this.canvas;
    const history = this.get();
    history.push(state);
    return this.save(history);
  },
  save(history) {
    console.log("Saving history", history);
    localStorage.setItem("autosave", JSON.stringify(history));
    return history;
  },
  recover(history) {
    console.log("Recovering", history);
    this.canvas.loadFromJSON(history || this.getCurrent());
  },
  undo() {
    if (!this.get().length) return alert("Nothing to un-do");

    this.freeze();
    const newHistory = this.get();
    this.redolist.push(newHistory.pop());
    console.log("redolist", this.redolist);
    console.log("Undo");
    this.save(newHistory);
    const last = newHistory.pop();
    this.recover(last);
    this.unfreeze();
  },
  redo() {
    if (!this.redolist.length) return alert("Nothing to re-do");

    console.log(this.redolist);
    this.freeze();
    const recovered = this.redolist.pop();
    console.log("Redo");

    this.add(recovered);
    this.recover(recovered);
    this.unfreeze();
  },
  clearRedo() {
    console.log("Clearing redo");
    this.redolist = [];
  },
  onUpdate() {
    if (this.frozen) return;

    history.clearRedo();
    history.add();
  },
  onClear() {
    this.onUpdate();
  },
  autosave() {
    setTimeout(history.onUpdate);
  },
  freeze() {
    this.frozen = true;
  },
  unfreeze() {
    setTimeout(() => (this.frozen = false), 100);
  },
};

export default history;
