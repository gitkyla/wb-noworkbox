import {getAll , getById  ,getAllPemain , getByIdPemain} from './db' // Import fungsi dari db.js
import swal from 'sweetalert' // import sweetalert

// Untuk Menangkap kesalahan atau error
const err = (err) => {
    console.log(err)
}

// Untuk Menangkap Respon
const res = (res) => {
    return res.json();
}

// Fetch page Klasemen
const fetchKlasemen = () => {

    if( 'caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/2021/standings`)
        .then(response => {
            if (response){
                response.json()
                .then(data => {
                    const peringkats = data.standings[0].table
                    
                    let scoring = '';
                    peringkats.forEach((peringkat) => {
                        scoring +=`
                        <tr>
                            <td class=" center">${peringkat.position}</td>
                            <td><img src="${peringkat.team.crestUrl}" width="40" height="40" alt="Gambar Tim ${peringkat.team.name}" class="imgtengah"></img></td>
                            <td>${peringkat.team.name}</td>
                            <td class="center">${peringkat.won}</td>
                            <td class="center">${peringkat.draw}</td>
                            <td class="center">${peringkat.lost}</td>
                            <td class="center">${peringkat.points}</td>
                        </tr>
                        `
                    })
                    document.querySelector('#scoring').innerHTML = scoring;
                })
            }
        })
    } 
    fetch(`https://api.football-data.org/v2/competitions/2021/standings` , {
        headers: {
            "X-Auth-Token": "10c2a693250040bcb1f144fd0e5f9c8b"
        }
    })
    .then(res)
    .then(data => {
        const peringkats = data.standings[0].table

        let scoring = '';
        peringkats.forEach((peringkat) => {
            scoring +=`
                <tr>
                    <td class=" center">${peringkat.position}</td>
                    <td><img src="${peringkat.team.crestUrl}" width="40" height="40" alt="Gambar Tim" class="imgtengah"></img></td>
                    <td>${peringkat.team.name}</td>
                    <td class="center">${peringkat.won}</td>
                    <td class="center">${peringkat.draw}</td>
                    <td class="center">${peringkat.lost}</td>
                    <td class="center">${peringkat.points}</td>
                </tr>
            `
        })
        document.querySelector('#scoring').innerHTML = scoring;
    })
    .catch(err)
}

// Fetch page Tim
const fetchTim = () => {

    if('caches' in window) {
        caches.match(`https://api.football-data.org/v2/competitions/2021/teams`)
        .then(response => {
            if (response){
                response.json()
                .then(data => {
                    const teams = data.teams
                    let divTim = '';
                    
                    teams.forEach((tim) => {            
                        divTim +=
                        `
                        <div class="col s12 m6 l4" >
                            <a href="info.html?id=${tim.id}">
                                <div class="card h-fix hoverable">
                                    <div class="card-image">
                                        <img class="teams-logo" src="${(tim.crestUrl !== null) ? tim.crestUrl:'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}"  height="200" width="220" alt="Logo tim ${tim.name}">
                                    </div>
                                    <div class="card-content red darken-1">
                                        <h5 class="bro light truncate white-text">${tim.name}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>
                            `;
                    })
                    document.querySelector('#team').innerHTML =  divTim
                })
            }
        })
    }
        fetch(`https://api.football-data.org/v2/competitions/2021/teams` , {
            headers: {
                'X-Auth-Token' : '10c2a693250040bcb1f144fd0e5f9c8b'
            }
        })
        .then(res)
        .then(data => {
            const teams = data.teams
            let divTim = '';
            
            teams.forEach((tim) => {            
                divTim +=
                `
                <div class="col s12 m6 l4" >
                    <a href="info.html?id=${tim.id}">
                        <div class="card h-fix hoverable">
                            <div class="card-image">
                                <img class="teams-logo" src="${(tim.crestUrl !== null) ? tim.crestUrl:'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}"  height="200" width="220" alt="Logo tim ${tim.name}">
                            </div>                  
                            <div class="card-content red darken-1">
                                <h5 class="bro truncate light white-text">${tim.name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
                    `;
            })
            document.querySelector('#team').innerHTML = divTim
        })
        .catch(err)
}

// Fetch detail mengenai info Tim
const getTimInfo = () => {
    return new Promise((resolve,reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if('caches' in window) {
            caches.match(`https://api.football-data.org/v2/teams/${idParam}`)
            .then(response => {
                if (response){
                    response.json()
                    .then(data => {
                        const imgInfo = document.querySelector('#img-info')
                        let listPemain = '';
                        const detailTim = document.querySelector('#detailtim')

                        detailTim.innerHTML = 
                        `
                        <tr>
                            <th>Nama Tim</th>
                            <td class="center">${data.name}</td>
                        <tr>
                        <tr>
                            <th>Alamat</th>
                            <td class="center" >${data.address}</td>
                        <tr>
                        <tr>
                            <th>Wilayah</th>
                            <td class="center">${data.area.name}</td>
                        <tr>
                        <tr>
                            <th>Email</th>
                            <td class="center">${(data.email !== null) ? data.email : '-'} </td>
                        <tr>
                        <tr>
                            <th>Didirikan</th>
                            <td class="center">${(data.founded !== null) ? data.founded : '-'}</td>
                        <tr>
                        <tr>
                            <th>Lokasi</th>
                            <td class="center">${(data.venue !== null) ? data.venue : '-'}</td>
                        <tr>
                        <tr>
                            <th>Website</th>
                            <td class="center">${(data.website !== null) ? data.website : '-'}</td>
                        <tr>
                        <tr>
                            <th>Telephone</th>
                            <td class="center">${(data.phone !== null) ? data.phone : '-'}</td>
                        <tr>
                        `
                
                        imgInfo.innerHTML =
                        `
                        <img class="imginfo" src="${data.crestUrl}" height="500" alt="Logo Tim ${data.name}">
                        <span class="card-title black-text">${data.name}</span>
                        `
                
                        data.squad.forEach((pemain) => {
                
                            listPemain += `
                            <tr>
                                <td><a href="player.html?id=${pemain.id}">${pemain.name}</a></td>
                                <td>${(pemain.position !== null) ? pemain.position:'Coach'}</td>
                            <tr>
                            `
                        })

                        document.querySelector('#pemain').innerHTML = listPemain;
                        resolve(data)
                    })
                }
            })
        } 

        fetch(`https://api.football-data.org/v2/teams/${idParam}` , {
        headers : {
            'X-Auth-Token' : '10c2a693250040bcb1f144fd0e5f9c8b'
        }
        })
        .then(res)
        .then(data => {
            const imgInfo = document.querySelector('#img-info')
            let listPemain = '';
            const detailTim = document.querySelector('#detailtim')
    
            detailTim.innerHTML = 
            `
            <tr>
                <th>Nama Tim</th>
                <td class="center">${data.name}</td>
            <tr>
            <tr>
                <th>Alamat</th>
                <td class="center" >${data.address}</td>
            <tr>
            <tr>
                <th>Wilayah</th>
                <td class="center">${data.area.name}</td>
            <tr>
            <tr>
                <th>Email</th>
                <td class="center">${(data.email !== null) ? data.email : '-'} </td>
            <tr>
            <tr>
                <th>Didirikan</th>
                <td class="center">${(data.founded !== null) ? data.founded : '-'}</td>
            <tr>
            <tr>
                <th>Lokasi</th>
                <td class="center">${(data.venue !== null) ? data.venue : '-'}</td>
            <tr>
            <tr>
                <th>Website</th>
                <td class="center">${(data.website !== null) ? data.website : '-'}</td>
            <tr>
            <tr>
                <th>Telephone</th>
                <td class="center">${(data.phone !== null) ? data.phone : '-'}</td>
            <tr>
            `
    
            imgInfo.innerHTML =
            `
            <img class="imginfo" src="${data.crestUrl}" height="500" alt="Logo Tim ${data.name}">
            <span class="card-title black-text">${data.name}</span>
            `
    
            data.squad.forEach((pemain) => {
    
                listPemain += `
                <tr>
                    <td><a href="player.html?id=${pemain.id}">${pemain.name}</a></td>
                    <td>${(pemain.position !== null) ? pemain.position:'Coach'}</td>
                <tr>
                `
            })

            document.querySelector('#pemain').innerHTML = listPemain;
            resolve(data)
        })
        
    })
}

// Fetch untuk mengetahui detail info pemain
const getPemainInfo = () => {
    return new Promise((resolve,reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if('caches' in window) {
            caches.match(`https://api.football-data.org/v2/players/${idParam}`)
            .then(response => {
                if (response){
                    response.json()
                    .then(data => {
                        const infoPemain = document.querySelector('#infopemain')
            
                        infoPemain.innerHTML = 
                        `
                        <tr>
                            <th>Nama</th>
                            <td><a href="player.html?id=${data.id}">${data.name}</a></td>
                        <tr>
                        <tr>
                            <th>Posisi</th>
                            <td>${(data.position !== null) ? data.position : '-'}</td>
                        <tr>
                        <tr>
                            <th>Nomor Baju</th>
                            <td>${(data.shirtNumber !== null) ? data.shirtNumber: '-'} </td>
                        <tr>
                        <tr>
                            <th>Kelahiran</th>
                            <td>${data.countryOfBirth}</td>
                        <tr>
                        <tr>
                            <th>Tanggal lahir</th>
                            <td>${data.dateOfBirth}</td>
                        <tr>
                        <tr>
                            <th>Kebangsaan</th>
                            <td>${data.nationality}</td>
                        <tr>
                        `
                        resolve(data)
                    })
                }
            })
        }

        fetch(`https://api.football-data.org/v2/players/${idParam}` , {
            headers : {
                'X-Auth-Token' : '10c2a693250040bcb1f144fd0e5f9c8b'
            }
        })
        .then(res)
        .then(data => {
            const infoPemain = document.querySelector('#infopemain');

            infoPemain.innerHTML = 
            `
            <tr>
                <th>Nama</th>
                <td><a href="player.html?id=${data.id}">${data.name}</a></td>
            <tr>
            <tr>
                <th>Posisi</th>
                <td>${(data.position !== null) ? data.position : '-'}</td>
            <tr>
            <tr>
                <th>Nomor Baju</th>
                <td>${(data.shirtNumber !== null) ? data.shirtNumber: '-'} </td>
            <tr>
            <tr>
                <th>Kelahiran</th>
                <td>${data.countryOfBirth}</td>
            <tr>
            <tr>
                <th>Tanggal lahir</th>
                <td>${data.dateOfBirth}</td>
            <tr>
            <tr>
                <th>Kebangsaan</th>
                <td>${data.nationality}</td>
            <tr>
            `
            resolve(data)
        })

    })
}

// Fungsi untuk Menampilkan database ke page 'Saved' (Favorited Team(s))
const getSavedTim = () => {
    getAll()
    .then((infos) => {
        
        let cardInfo = '';
        
        infos.forEach((info) => {

            cardInfo += 
            `
            <div class="col s12 m6 xl4" >
                <a href="./info.html?id=${info.id}&saved=true">
                    <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light ">
                            <img src="${info.crestUrl}" class="timbadge" alt="Team ${info.name}"></img>
                        </div>
                        <div class="card-content red darken-1">
                            <span class="card-title truncate white-text">${info.name}</span>
                        </div>
                    </div>
                </a>
            </div>
            `
        })
        document.querySelector('#infos').innerHTML = cardInfo
      });
}

// Fungsi untuk menampilkan Database ke page 'Saved' (Favorited player(s))
const getSavedPemain = () => {
    getAllPemain()
    .then((players) => {
        
        let cardInfo = '';
        
        players.forEach((player) => {

            cardInfo += 
            `
            <div class="col s12 m6 xl4" >
            <a href="./player.html?id=${player.id}&saved=true">
                <div class="card hoverable">
                    <div class="card-image waves-effect waves-block waves-light ">
                        <img src="./img/player.png" class="playerbadge" alt="Pemain ${player.name}"></img>
                    </div>
                
                <div class="card-content red darken-1">
                     <span class="card-title truncate white-text">${player.name}</span>  
                </div>
                </div>
            </a>
            </div>
            `
        })
        document.querySelector('#players').innerHTML = cardInfo
      });
}

// Fungsi untuk mengetahui dari page &saved=true 
const getSavedPemainById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    getByIdPemain(idParam).then(player => {
        const infoPemain = document.querySelector('#infopemain')
            
        infoPemain.innerHTML = 
        `
        <tr>
            <th>Nama</th>
            <td><a href="player.html?id=${player.id}">${player.name}</a></td>
        <tr>
        <tr>
            <th>Posisi</th>
            <td>${(player.position !== null) ? player.position : '-'}</td>
        <tr>
        <tr>
            <th>Nomor Baju</th>
            <td>${(player.shirtNumber !== null) ? player.shirtNumber: '-'} </td>
        <tr>
        <tr>
            <th>Kelahiran</th>
            <td>${player.countryOfBirth}</td>
        <tr>
        <tr>
            <th>Tanggal lahir</th>
            <td>${player.dateOfBirth}</td>
        <tr>
        <tr>
            <th>Kebangsaan</th>
            <td>${player.nationality}</td>
        <tr>
        `
    })
    .catch(() => {
        swal({
            title: "Item sudah tidak ada di penyimpanan!",
            text: "Kami akan redirect anda ke halaman utama",
            icon: "error",
          })
          .then(value => {
              if(value){
                  window.location.href = 'index.html'
              } else {
                  window.location.href = 'index.html'
              }
          })
    })
}

// Fungsi untuk mengetahui dari page &saved=true 
const getSavedTimById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    getById(idParam).then(info => {

        const imgInfo = document.querySelector('#img-info')
        let listPemain = '';
        const detailTim = document.querySelector('#detailtim')

        detailTim.innerHTML = 
        `
        <tr>
            <th>Nama Tim</th>
            <td class="center">${info.name}</td>
        <tr>
        <tr>
            <th>Alamat</th>
            <td class="center" >${info.address}</td>
        <tr>
        <tr>
            <th>Wilayah</th>
            <td class="center">${info.area.name}</td>
        <tr>
        <tr>
            <th>Email</th>
            <td class="center">${(info.email !== null) ? info.email : '-'}</td>
        <tr>
        <tr>
            <th>Didirikan</th>
            <td class="center">${info.founded}</td>
        <tr>
        <tr>
            <th>Lokasi</th>
            <td class="center">${info.venue}</td>
        <tr>
        <tr>
            <th>Website</th>
            <td class="center">${info.website}</td>
        <tr>
        <tr>
            <th>Telephone</th>
            <td class="center">${(info.phone !== null) ? info.phone : '-'} </td>
        <tr>
        `

        imgInfo.innerHTML =
        `
        <img class="imginfo" src="${info.crestUrl}" height="500" alt="Logo Tim ${info.name}">
        <span class="card-title black-text">${info.name}</span>
        `

        info.squad.forEach((pemain) => {

        listPemain  += `
        <tr>
            <td><a href="player.html?id=${pemain.id}">${pemain.name}</a></td>
            <td>${(pemain.position !== null) ? pemain.position:'Coach'}</td>
        <tr>
        `
        });
        document.querySelector('#pemain').innerHTML = listPemain;
    })
    .catch(() => {
        swal({
            title: "Item sudah tidak ada di penyimpanan!",
            text: "Kami akan redirect anda ke halaman utama",
            icon: "error",
          })
          .then(value => {
              if(value){
                  window.location.href = 'index.html'
              } else {
                  window.location.href = 'index.html'
              }
          })
    })
}

export {fetchKlasemen , fetchTim , getTimInfo , getPemainInfo};
export {getSavedTim, getSavedTimById}
export { getSavedPemainById , getSavedPemain}