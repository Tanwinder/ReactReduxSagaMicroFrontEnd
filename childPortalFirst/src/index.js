import React from 'react';
import { render } from 'react-dom';
// import 'babel-polyfill';
import App from './app';

import store from './configureStore'
import { Provider } from 'react-redux';
import routes from './routes';

class KooOptimizationCt extends HTMLElement {
    
    constructor(props) {
        super(props);
    }

    connectedCallback() {

        try {

            if (this.errorMode) {
                throw new Error('Application failed at load');
            }

        } catch (e) {
            return;
        }
        // window.addEventListener("beforeunload", (ev) => 
        // {  
        //     ev.preventDefault();
        //     return ev.returnValue = 'Are you sure you want to close?';
        // });
        this.render();
    }

    render() {
        const userdetailsobj = this.getAttribute("userdetailsobj");
        
        render(<Provider store={store}>
                <App userdetailsobj={userdetailsobj ? userdetailsobj : 'testUser'} />
        </Provider>, this);
    }

    disconnectedCallback() {
        console.log('ReactApp disconnected po order optimization',);
        // window.removeEventListener('onbeforeunload',null,false)
    }
}

window.customElements.define('app1-app', KooOptimizationCt);