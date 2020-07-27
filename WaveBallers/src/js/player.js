import {getPemainInfo , getSavedPemainById} from './api';
import {savePemain , delPlayer} from './db';
import { loadingTime } from './loading'; 


document.addEventListener('DOMContentLoaded' , () => {

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
  
    var itemPemain = getPemainInfo();
    const simpan = document.getElementById("save");
    const hapus = document.getElementById('delete')

    loadingTime();

    if(isFromSaved){
        simpan.style.display = 'none';
        getSavedPemainById();
    } else {
        hapus.style.display = 'none'
        var itemPemain =  getPemainInfo();
    }

    simpan.onclick = () => {
        itemPemain.then(player => {
            savePemain(player)
        })
    }

    hapus.onclick = () => {
        itemPemain.then(id => {
            delPlayer(id)
        })
    }
})