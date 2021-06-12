const initialState = {
    data: [],
    gmm: '',
    dma: '',
    dept: '',
    buyer: '',
    classe: '',
    subClass: '',
    year:'',
    season: '',
    week: '',
    products: [],
    productPanel: true,
    demandPanel: false
}

export default (state= initialState, action) => {
    switch(action.type) {
        case 'CHANGE_GMM':
            return {
                ...state,
                gmm: action.item
            }
        case 'CHANGE_DMA':
            return {
                ...state,
                dma: action.item
            }
        case 'CHANGE_DEPT':
            return {
                ...state,
                dept: action.item
            }
        case 'CHANGE_BUYER':
            return {
                ...state,
                buyer: action.item
            }
        case 'CHANGE_CLASS':
            return {
                ...state,
                classe: action.item
            }
        case 'CHANGE_SUBCLASS':
            return {
                ...state,
                subClass: action.item
            }
        case 'CHANGE_YEAR':
            return {
                ...state,
                year: action.item
            } 
        case 'CHANGE_SEASON':
            return {
                ...state,
                season: action.item
            }
        case 'CHANGE_WEEK':
            return {
                ...state,
                week: action.item
            }
        case 'PRODUCT_PANEL':
            return {
                ...state,
                productPanel: action.productPanel
            }
        case 'DEMAND_PANEL':
            return {
                ...state,
                demandPanel: action.demandPanel
            }
        case 'SEARCH_BUTTON':
            return {
                ...state,
                productPanel: true,
                demandPanel: true,
            }    
        default:
            return state;
    }
}