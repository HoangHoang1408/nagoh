class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  count() {
    this.query = this.query.count();
    return this;
  }
  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find(location);
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["location"];
    removeFields.forEach((e) => delete queryCopy[e]);
    this.query = this.query.find(queryCopy);
    return this;
  }
  paginate(resPerPage = 4) {
    const currentPage = +this.queryStr.page || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
export default APIFeatures;
