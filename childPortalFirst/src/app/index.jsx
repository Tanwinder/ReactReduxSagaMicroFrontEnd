import React from 'react';
import axios from 'axios'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/modules/dashboard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const runLocal = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getHeaderAuth: true
    }
  }

  render() {
    const { getHeaderAuth } = this.state;
    const { userdetailsobj } = this.props;
    return <React.Fragment>
      {
        getHeaderAuth?
        <BrowserRouter>
        <Switch>
          <Route path="/app1" name="app1" render={ props => <Dashboard {...props} userdetailsobj={userdetailsobj} /> } />
        </Switch>
        </BrowserRouter>
         :
        "Loading..."
      }
        
    </React.Fragment>
  }

  setAuthorizationHeaders() {
    let self = this;

    if(runLocal) {
        let data = {};
        self.setAxiosHeaders(data);
        self.setState({
          getHeaderAuth: true
        })
    } else {
        if (!('indexedDB' in window)) {

            return;
        }
  
        var request = window.indexedDB.open("ImsDataBase", 10);
        var db;
  
        request.onsuccess = function (event) {
  
            try {
  
                db = request.result;
                var transaction = db.transaction(['fuseui']);
                var objectStore = transaction.objectStore('fuseui');
                var request1 = objectStore.get(1);
  
                request1.onerror = function (event) {
  
  
                    return {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": '',
                        "Delivery-Date": '',
                        "From": '',
                        "X-Correlation-ID": ''
                    };
                };
  
                request1.onsuccess = function (event) {
  
                    if (request1.result) {
                        self.setAxiosHeaders(request1.result.headers);
                        self.setState({
                          getHeaderAuth: true
                        })
                        return request1.result.headers;
  
                    } else {
  
                        return {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Authorization": '',
                            "Delivery-Date": '',
                            "From": '',
                            "X-Correlation-ID": ''
                        };
                    }
                };
            }
            catch (e) {
  
                console.log("Index Db Open Error" + e);
            }
        }
  
        request.onerror = function (event) {
  
            console.log('Unable to fetch headers from indexedDB');
  
            return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": '',
                "Delivery-Date": '',
                "From": '',
                "X-Correlation-ID": ''
            }
        }
    }
  }

  setAxiosHeaders(data) {
      axios.defaults.headers.common['Authorization'] = data['Authorization'] ? data['Authorization'] : '';
      axios.defaults.headers.common['Delivery-Date'] = data['Delivery-Date'] ? data['Delivery-Date'] : '';
      axios.defaults.headers.common['From'] = data['From'] ? data['From'] : '';
      axios.defaults.headers.common['X-Correlation-ID'] = data['X-Correlation-ID'] ? data['X-Correlation-ID'] : '';
      axios.defaults.headers.common['Application'] = "FUSE_UI";
    //   axios.defaults.headers.common['expect'] = "100-continue";
  };

  componentDidMount() {
  //   let urlsVall = sessionStorage.getItem('rocOrderOptimizationUrls');
  //   if(!!urlsVall) {
  //     this.setAuthorizationHeaders();
  //   } else {
  //     let responseFunc = getEnvRocOptimizationUrls();
  //     responseFunc
  //     .then((response) => {
  //       if (!!response && response.data) {
  //         console.log(response.data, '-----all env urls');
  //         sessionStorage.setItem('rocOrderOptimizationUrls', JSON.stringify(response.data));
  //         this.setAuthorizationHeaders();
  //       }
  //     }).catch((e) => {
  //         console.log(e);
  //     });
  //   }
    
  }
}