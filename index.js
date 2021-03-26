
const { exec } = require('child_process');

// testnetteki serverları listeleme fonksiyonu
/*
const getServers = new Promise((resolve, reject) => {
  exec(`electrum --testnet getservers`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});

// testnetteki bağlantı bilgimizi sorgulayan fonksiyon
const getInfo = new Promise((resolve, reject) => {
  exec(`electrum --testnet getinfo`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});

*/

// cüzdan yoksa oluşturmaktır.

const createWallet = () => new Promise((resolve, reject) => {
  exec(`electrum --testnet create`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});

// tanımlanabilir bir cüzdan var mı?
const loadWallet = () => new Promise((resolve, reject) => {
  exec(`electrum --testnet load_wallet`, (err, data)=> {
    if (err) {
      reject('load error');
      }
    
      resolve(data);
  });
});

// cüzdan varsa adres oluştur.
const createNewAddress = () => new Promise((resolve, reject) => {
  exec(`electrum --testnet createnewaddress`, (err, data)=> {
    if (err) {
      reject('new adddress error');
      }
    
      resolve(data);
  });
});



// https://testnet-faucet.mempool.co/ bu adresten 0.001 BTC bu adrese aldım

//Get balance

const getBalance = () => new Promise((resolve, reject) => {
  exec(`electrum --testnet getbalance`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});



/*
// Create new wallet address

const payto = (address, amount) => new Promise((resolve, reject) => {
  exec(`electrum --testnet payto ${address} ${amount}`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});

payto(dsadsa,0.01).then(data => {
  console.log(data);
}).catch(err => console.error(err));

const broadcast = (transactionId) => new Promise((resolve, reject) => {
  exec(`electrum --testnet broadcast ${transactionId}`, (err, data)=> {
    if (err) {
      reject(err);
      }
    
      resolve(data);
  });
});


broadcast('','').then(data => {
  console.log(data);
}).catch(err => console.error(err));


getBalance().then(data => {
  console.log(data);
}).catch(err => console.error(err)); */


const main = async () => {
  const walletData = await loadWallet();

  if (walletData) {
    const newAddress = await createNewAddress();
    console.log(`yeni adres oluşturuldu ${newAddress}`);
  } else {
    console.log('ilk önce cüzdan oluşturulması gerekiyor');
    const newWallet = await createWallet();
    console.log(`yeni cüzdan oluşturuldu ${newWallet}`);
  }

  const balance = await getBalance();
  console.log(`Bakiyeniz: ${balance}`); 
}

main();