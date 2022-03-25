class ApiFeatures {
  connstructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const temp = { ...this.queryStr };
    const removeFields = ['keyword', 'sort', 'limit', 'page'];
    removeFields.forEach((el) => delete temp[el]);

    let queryStr = JSON.stringify(temp);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (el) => `$${el}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.spilt(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-creadtedAt');
    }
    return this;
  }

  page(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
