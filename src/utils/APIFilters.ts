export default class APIFilters {
    public query: any;
    private queryStr: {
        keyword?: string | null,
        category?: string | null,
        price?: {
            lte?: number,
            gte?: number
        },
        page?: number | null
    };

    constructor(query: any, queryStr: {
        keyword?: string | null,
        category?: string | null,
        price?: {
            lte?: number,
            gte?: number
        },
        page?: number | null
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

    filter() {
        const queryCopy: any = { ...this.queryStr }
        // remove page and keyword words since the page and keyword are used for pagination and searching respectively
        const removeFields = ['keyword', 'page']
        if (queryCopy.price) {
            const { gte, lte } = queryCopy.price;
            if (gte) this.query = this.query.find({ price: { $gte: gte } });
            if (lte) this.query = this.query.find({ price: { $lte: lte } });
            delete queryCopy.price;
        }
        
        removeFields.forEach((el) => delete queryCopy[el])
        this.query = this.query.find(queryCopy)
        return this
    }

    pagination(resPerPage: number, page:number) {
        const currentPage = Number(page) || 1
        const skip = resPerPage * (currentPage - 1)
        this.query = this.query.limit(resPerPage).skip(skip)
        // console.log(this.query)
        return this
    }
}