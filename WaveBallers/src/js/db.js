import idb from 'idb'
import swal from 'sweetalert'

const dbPromised = idb.open('waveballers' ,3, upgradeDb => {
    const allInfoObjectStore = upgradeDb.createObjectStore('infos' , {
        keyPath: "id"
    });
    const playerObjectStore = upgradeDb.createObjectStore('players' , {
        keyPath: "id"
    });
    playerObjectStore.createIndex('player', 'player' , {unique : false});
    allInfoObjectStore.createIndex('name', 'name' , {unique : false});
})

// Database untuk Team
const saveTeam = (info) => {
    dbPromised
        .then( db => {
            const tx = db.transaction("infos" , 'readwrite');
            const store = tx.objectStore('infos');
            store.add(info);
            return tx.complete;
        })
        .then(() => {
            swal({
                title: "Tersimpan",
                text: "Item yang anda pilih tersimpan!",
                icon: "success",
              });
        })
        .catch(() =>{
            swal({
                title: "Sudah tersimpan di penyimpanan!",
                text: "Item yang anda pilih sudah ada di penyimpanan!",
                icon: "error"
              });
        })
}

const delTeam = (id) => {
    dbPromised.then(function(db) {
        const tx = db.transaction('infos', 'readwrite');
        const store = tx.objectStore('infos');
        store.delete(id.id);
        return tx.complete;
    })
    .then(function() {
        swal({
            title: "Dihapus",
            text: "Item yang anda pilih Dihapus!",
            icon: "success",
          });
    })
    .catch(() => {
        swal({
            title: "Sudah dihapus dari penyimpanan!",
            text: "Item yang anda hapus sudah tidak ada di penyimpanan!",
            icon: "error",
          }); 
    })
}

const getAll = () => {
    return new Promise ((resolve,reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction('infos' , 'readonly');
                const store = tx.objectStore('infos');
                return store.getAll();
            })
            .then(infos => {
                resolve(infos);
            })
    })
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(db => {
          const tx = db.transaction("infos", "readonly");
          const store = tx.objectStore("infos");
          return store.get(parseInt(id));
        })
        .then(function(info) {
        resolve(info);
        });
    });
  }


// Membuat DB Baru untuk Save Player

const savePemain = (player) => {
    dbPromised
        .then( db => {
            const tx = db.transaction("players" , 'readwrite');
            const store = tx.objectStore('players');
            store.add(player);
            return tx.complete;
        })
        .then(() => {
            swal({
                title: "Tersimpan",
                text: "Item yang anda pilih tersimpan!",
                icon: "success",
              });
        })
        .catch(() =>{
            swal({
                title: "Sudah terismpan di penyimpanan!",
                text: "Item yang anda pilih sudah ada di penyimpanan!",
                icon: "error"
              });
        })
}

const delPlayer = (id) => {
    dbPromised.then(function(db) {
        const tx = db.transaction('players', 'readwrite');
        const store = tx.objectStore('players');
        store.delete(id.id);
        return tx.complete;
    })
    .then(function() {
        swal({
            title: "Dihapus",
            text: "Item yang anda pilih Dihapus!",
            icon: "success",
          });
    })
    .catch(() => {
        swal({
            title: "Sudah dihapus dari penyimpanan!",
            text: "Item yang anda hapus sudah tidak ada di penyimpanan!",
            icon: "error",
          }); 
    })
}

const getAllPemain = () => {
    return new Promise ((resolve,reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction('players' , 'readonly');
                const store = tx.objectStore('players');
                return store.getAll();
            })
            .then(players => {
                resolve(players);
            })
    })
}

const getByIdPemain = (id) => {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(db => {
          const tx = db.transaction("players", "readonly");
          const store = tx.objectStore("players");
          return store.get(parseInt(id));
        })
        .then(function(player) {
        resolve(player);
        });
    });
}


export {saveTeam , getAll , getById,delTeam};
export {savePemain,getAllPemain,getByIdPemain ,delPlayer}