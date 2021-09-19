class Utils {
  validateItemExist(source, addedItem) {
    for (var i = 0; i < source.length; i++) {
      if (source[i].teamMemberId == addedItem.teamMemberId) return true;
    }
    return false;
  }
}
export default new Utils();
