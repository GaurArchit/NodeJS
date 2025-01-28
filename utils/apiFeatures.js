
class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filter() {
      
      console.log(this.queryString);
      const queryObj = { ...this.queryString }; //This is know as shalow mapping
      const excludeFields = ['page', 'sort', 'limit', 'fields'];
      excludeFields.forEach((el) => delete queryObj[el]);
      console.log(queryObj);
      //1.1).Advance filtering in this we will be handling the graterthan and lessthan
      let queryStr = JSON.stringify(queryObj); //since here we are taking the req.query therefore will convert it to string
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      ); //this is the regex expression
      console.log('line number 83', JSON.parse(queryStr));
      //let query = Tour.find(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));//here it first create object of mongoose with the help of this.query=Tours.find() , thus now we can add more instuction to it 
     //this line is same as// this.query = Tour.find().find(JSON.parse(queryStr)) =this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      //2)Sorting the query
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        console.log(sortBy);
        this.query = this.query.sort(sortBy); //sort here is a mongoose method
      } else {
        this.query = this.query.sort('-crecreatedAt');
      }
      return this;
    }
    limitingField() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
    pagination() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit); //here skip and limit are the mongoose method that we use

      return this;
    }
  }
  module.exports=APIFeatures;