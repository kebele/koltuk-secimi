/* thanks to brad traversy*/

/* bu dosyada local storage a kayıt ile ilgili işlemler olacak
script1.js de ise normal işlemler var
kodu buraya aynen alıp yorumları sildim*/

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');    

    /* bu noktada seçilmiş olan koltukları belirledik, bunları bir array içinde tutup bunu da bir storage a yollayıp orada tutmalıyız, çünkü şu anda tarayıcı refresh inde veya benzeri bir durumda bu bilgi kayboluyor */

    //yapmamız gerekenler
    //copy selected seat into an array
    //map through array
    //return a new array indexes

    // const seatsIndex = [...selectedSeats];
    
    //... spread operator / map operator
    // const arr = [1,2,3];
    // const arr2 = [...arr,4,5];
    // console.log(arr2);
    //(5)[1,2,3,4,5]
    // arr2.forEach((x)=>{
    //     console.log(x)
    // });
    //tek tek sıralar arr2 yi
    // console.log(arr2);
    //(5) [1, 2, 3, 4, 5]
    //yani forEach dizide bir değişiklik yapmaz diziyi kullanarak işlem yapar
    //ancak map dizide değişiklik yapar, bir function döndürür

    //map operator
    // const dizi = [1,2,3];
    // const dizi2 = [...dizi,4,5];

    // const dizi3 = dizi2.map((x)=>{
    //     return x * 2
    // })
    // console.log(dizi3);
    //(5) [2, 4, 6, 8, 10]
    //yeni dizi yaptık, map kullanarak, map return lu

    const seatsIndex = [...selectedSeats].map((koltuk)=>{
        return [...seats].indexOf(koltuk)
        /* seats htmldeki '.row .seat:not(.occupied)' özelliğine sahipleri seçiyor, yani her satırdaki seçili olmayan koltuklar
        [...seats] diyerek bunları bir diziye atıyoruz, artık bunlar bir dizinin elemanları, biz click ile bir koltuk seçtikçe aslında seçtiğimiz koltuğun özelliği '.row .seat:not(.occupied)' oluyor yani seçili hale geliyor ve seats arrayine ekleniyor, indexOf(x) kullanarak da her bir [...seats] array i elemanının yani seçili koltuğun bu dizidei index ini alıyoruz 
        */
    });

    //console.log(seatsIndex);

   
    //indexOf() kullanımı
    // const dz = ["a","b","c","d","e"];
    // console.log(dz.indexOf("c"));
    //2
    //indexOf(xxx) bir dizideki istenen elemanın index ini getirir

     //localStorage kullanımı
     localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

      /* bu işlem ile local storage a kaydettik, ancak sayfayı yenilediğimizde yine eski hali galiyor ancak localStorage a dev tools application dan bakarsak aslında kaydettiklerimiz orada duruyor, bunun sebebi, localStorage a kayıt yaptık ama bunları geri sayfaya çağırmadık, ayrıca localStorage da film ve fiyat bilgisi de tutmalıyız, onu da movieSelect te */

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localStorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats)
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                //yani parametre olarak gelen index array içerisinde bir değer ise yani dizie varsa
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value);
    //yeni bir function tanımlayalım setMovieData() film seçimi ile ilgili konuları buradan takip edelim
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


//seat click event
container.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){        
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();


