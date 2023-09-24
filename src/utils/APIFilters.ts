export default class APIFilters {
    public query: any;
    private queryStr: {
        keyword: string | null
    };

    constructor(query: any, queryStr: {
        keyword: string | null
    }) {
        this.query = query;
        this.queryStr = queryStr;
    }
    
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        // console.log(keyword)
        
        this.query = this.query.find({ ...keyword });
        return this;
    }
}