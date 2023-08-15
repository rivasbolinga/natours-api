class APIFeatures {
  constructor(query, querySting) {
    this.query = query;
    this.querySting = querySting;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // We use regular expresion to replace get, gt,lte and lt for the dolar sign.
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.querySting.sort) {
      const sortBy = this.querySting.sort;
      this.query = this.query.sort({ [sortBy]: 1 });
    } else {
      this.query = this.query.sort({ createdAt: -1 });
    }
    return this;
  }

  limitFields() {
    if (this.querySting.fields) {
      const fields = this.querySting.fields.split(',').join();
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.querySting.page * 1 || 1;
    const limit = this.querySting.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
