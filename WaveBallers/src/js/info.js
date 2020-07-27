import {getTimInfo , getSavedTimById} from './api';
import {saveTeam , delTeam} from './db';
import { loadingTime } from './loading';


document.addEventListener('DOMContentLoaded' , () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
  
    var item = getTimInfo();
    const simpan = document.getElementById("save");
    const hapus = document.getElementById('delete')

    loadingTime();

    if(isFromSaved){
        simpan.style.display = 'none';
        getSavedTimById();
    } else {
        hapus.style.display = 'none'
        var item =  getTimInfo();
    }

    simpan.onclick = () => {
        item.then(info => {
            saveTeam(info)
        })
    }

    hapus.onclick = () => {
        item.then(id => {
            delTeam(id)
        })
    }

})