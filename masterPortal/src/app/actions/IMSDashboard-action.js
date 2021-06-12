import axios from "axios";
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

export const selectDay = (selectedDay) => {
    return (dispatch, getState) => {
        dispatch({ type: "IMSD_SET_ULC_DAY", selectedDay });
    }
}

export const toggleUserLoadType = (userLoadType) => {
    return (dispatch, getState) => {
        dispatch({ type: "IMSD_TOGGLE_USER_LOAD_TYPE", userLoadType });
    }
}

export const togglePOTrendType = (POTrendType) => {
    return (dispatch, getState) => {
        dispatch({ type: "IMSD_TOGGLE_PO_TREND_TYPE", POTrendType });
    }
}

export const toggleAllocTrendType = (AllocTrendType) => {
    return (dispatch, getState) => {
        dispatch({ type: "IMSD_TOGGLE_ALLOC_TREND_TYPE", AllocTrendType });
    }
}

export const fetchIMSDashboardData = () => {
    return (dispatch, getState) => {
        const {userDetails} = getState().homePage.userData;

        axios.get('/authenticateUser')
          .then(aur => {
            axios.defaults.headers.common['Authorization'] = aur.data['Authorization'] ? aur.data['Authorization'] : '';
            axios.defaults.headers.common['Delivery-Date'] = aur.data['Delivery-Date'] ? aur.data['Delivery-Date'] : '';
            axios.defaults.headers.common['From'] = aur.data['From'] ? aur.data['From'] : '';
            axios.defaults.headers.common['X-Correlation-ID'] = aur.data['X-Correlation-ID'] ? aur.data['X-Correlation-ID'] : '';

            axios.get(`serviceurl`)
            .then( res => {
                if (res.status === 200) {
                    dispatch({type: "IMSD_SET_DEPARTMENTS", data: res.data});
                }
            })
            .catch()
        })
        .catch()

        dispatch({type: "IMSD_SET_PO_CARD_DETAILS_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                if (!!data.length && data[0] && data[1]){
                    data = [{
                        "PO_COUNT": data[1].PO_COUNT,
                        "DOLLAR_AMOUNT": data[1].DOLLAR_AMOUNT.toFixed(2),
                        "PO_COUNT_FLAG": data[1].PO_COUNT > data[0].PO_COUNT,
                        "DOLLAR_AMOUNT_FLAG": data[1].DOLLAR_AMOUNT > data[0].DOLLAR_AMOUNT
                    }]
                }
                dispatch({type: "IMSD_SET_PO_CARD_DETAILS", data})
            } else {
                dispatch({type: "IMSD_SET_PO_CARD_DETAILS_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_PO_CARD_DETAILS_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_ALLOC_CARD_DETAILS_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                if (!!data.length && data[0] && data[1]){
                    data = [{
                        "ALLOCATION_COUNT": data[1].ALLOCATION_COUNT,
                        // "DOLLAR_AMOUNT": data[1].DOLLAR_AMOUNT.toFixed(2),
                        "ALLOCATION_COUNT_FLAG": data[1].ALLOCATION_COUNT > data[0].ALLOCATION_COUNT,
                        // "DOLLAR_AMOUNT_FLAG": data[1].DOLLAR_AMOUNT > data[0].DOLLAR_AMOUNT
                    }]
                }
                dispatch({type: "IMSD_SET_ALLOC_CARD_DETAILS", data})
            } else {
                dispatch({type: "IMSD_SET_ALLOC_CARD_DETAILS_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_ALLOC_CARD_DETAILS_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_REPLEN_CARD_DETAILS_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                if (!!data.length && data[0] && data[1]){
                    data = [{
                        "PO_COUNT": data[1].PO_COUNT,
                        "DOLLAR_AMOUNT": data[1].DOLLAR_AMOUNT.toFixed(2),
                        "PO_COUNT_FLAG": data[1].PO_COUNT > data[0].PO_COUNT,
                        "DOLLAR_AMOUNT_FLAG": data[1].DOLLAR_AMOUNT > data[0].DOLLAR_AMOUNT
                    }]
                }
                dispatch({type: "IMSD_SET_REPLEN_CARD_DETAILS", data})
            } else {
                dispatch({type: "IMSD_SET_REPLEN_CARD_DETAILS_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_REPLEN_CARD_DETAILS_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_PO_TREND_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                dispatch({type: "IMSD_SET_PO_TREND", data})
            } else {
                dispatch({type: "IMSD_SET_PO_TREND_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_PO_TREND_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_PO_YEAR_TREND_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                dispatch({type: "IMSD_SET_PO_YEAR_TREND", data})
            } else {
                dispatch({type: "IMSD_SET_PO_YEAR_TREND_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_PO_YEAR_TREND_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_ALLOC_TREND_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                dispatch({type: "IMSD_SET_ALLOC_TREND", data})
            } else {
                dispatch({type: "IMSD_SET_ALLOC_TREND_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_ALLOC_TREND_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_ALLOC_YEAR_TREND_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data.sort((a, b) => a.DATE_VALUE < b.DATE_VALUE ? -1 : 1);
                dispatch({type: "IMSD_SET_ALLOC_YEAR_TREND", data})
            } else {
                dispatch({type: "IMSD_SET_ALLOC_YEAR_TREND_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_ALLOC_YEAR_TREND_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_PO_DEPT_CHART_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data[0].DEPT_ARRAY.sort((a, b) => a.PO_COUNT - b.PO_COUNT).reverse();
                dispatch({type: "IMSD_SET_PO_DEPT_CHART", data: data[0].DEPT_ARRAY})
            } else {
                dispatch({type: "IMSD_SET_PO_DEPT_CHART_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_PO_DEPT_CHART_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_ALLOC_DEPT_CHART_FS", status: "Loading"});
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                let data = res.data;
                data[0].DEPT_ARRAY.sort((a, b) => a.ALLOCATION_COUNT - b.ALLOCATION_COUNT).reverse();
                dispatch({type: "IMSD_SET_ALLOC_DEPT_CHART", data: data[0].DEPT_ARRAY})
            } else {
                dispatch({type: "IMSD_SET_ALLOC_DEPT_CHART_FS", status: "Error" })
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_ALLOC_DEPT_CHART_FS", status: "Error" })
        })

        dispatch({type: "IMSD_SET_USER_LOAD_HR_FS", status: "Loading"})
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                dispatch({type: "IMSD_SET_USER_LOAD_HR", data: res.data })
            } else {
                dispatch({type: "IMSD_SET_USER_LOAD_HR_FS", status: "Error"})
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_USER_LOAD_HR_FS", status: "Error"})
        })
    
        dispatch({type: "IMSD_SET_USER_LOAD_DAY_FS", status: "Loading"})
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                dispatch({type: "IMSD_SET_USER_LOAD_DAY", data: res.data })
            } else {
                dispatch({type: "IMSD_SET_USER_LOAD_DAY_FS", status: "Error"})
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_USER_LOAD_DAY_FS", status: "Error"})
        })

        dispatch({type: "IMSD_SET_USER_LOAD_MONTH_FS", status: "Error"})
        axios.get(`serviceurl`)
        .then( res => {
            if (res.status === 200) {
                dispatch({type: "IMSD_SET_USER_LOAD_MONTH", data: res.data })
            } else {
                dispatch({type: "IMSD_SET_USER_LOAD_MONTH_FS", status: "Error"})
            }
        })
        .catch(() => {
            dispatch({type: "IMSD_SET_USER_LOAD_MONTH_FS", status: "Error"})
        })
    }
}