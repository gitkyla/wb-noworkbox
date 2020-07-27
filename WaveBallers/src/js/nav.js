import { fetchKlasemen as fKlasemen , fetchTim as fTim , getSavedTim , getSavedPemain} from './api';
import {loadingTime} from './loading'

document.addEventListener('DOMContentLoaded', () => {

    const sideNav = document.querySelector('.sidenav');
    const topNav = document.querySelector('.topnav')
    const content = document.querySelector('#content')
    const footer = document.querySelector('#footer')
   

    M.Sidenav.init(sideNav);
    

    // response
    const responseFetch = (responseFetch) => {
        if(responseFetch.ok){
            return responseFetch.text()
        } else {
           return Promise.reject(catchFetch)
        }
    }
    // Catch
    const catchFetch = (catchFetch) => {
        console.log('Fetch error di = ' , catchFetch)
    } 

    let page = window.location.hash.substr(1);
        if (page == '') page = 'home';

    const navBar = () => {
        fetch('nav.html')
        .then(responseFetch)
        .then(data => {
            topNav.innerHTML = data
            sideNav.innerHTML = data

            document.querySelectorAll('.topnav a , .sidenav a').forEach((navlink) =>{
                navlink.addEventListener('click', (e) =>{
                    M.Sidenav.getInstance(sideNav).close();

                    page = e.currentTarget.getAttribute("href").substr(1);
                    loadContent(page)
                })
            })
        })
        .catch(catchFetch)
    }

    const loadContent = (page) => {
        const url = `/pages/${page}.html`

        fetch(url)
        .then(responseFetch)
        .then(data => {
            content.innerHTML = data;

            // Fungsi untuk animasi loading
            loadingTime();

            // Slider
            const theSlider = document.querySelector('.slider')  
            M.Slider.init(theSlider , {
                height: 300,
                indicators: false
            });

            // Materialboxed
            const materialboxed =  document.querySelectorAll('.materialboxed');
            M.Materialbox.init(materialboxed);

            if( page === 'klasemen'){
               fKlasemen()
            } else if( page === 'tim'){
                fTim();
            } else if(page === 'save'){
                const collapsible = document.querySelectorAll('.collapsible');
                M.Collapsible.init(collapsible)

                getSavedTim();
                getSavedPemain();
            }
        })
        .catch(catchFetch)
    }

    const loadFooter = () => {
        fetch('footer.html')
        .then(responseFetch)
        .then(data => {
            footer.innerHTML = data;
        })
        .catch(catchFetch)
    }

    navBar();
    loadContent(page);
    loadFooter()
    
})

