
const backWrapEnd=document.querySelector('.back')



detailsFetch()

function detailsFetch() {
    const url=new URL(location.href);

if(url.searchParams.has('postId')) {
    let postId=url.searchParams.get('postId')
    fetch(`https://restcountries.com/v3.1/name/${postId}`)
    .then((response)=>response.json())
    .then((data) => {
        backWrapEnd.insertAdjacentHTML('afterend',detailsHtml(data[0]))
        // console.log(data[0])
    })
}
    else {
        location.href='index.html'
    }
}


function detailsHtml (data) {
    // let topLvl=data.topLevelDomain.map((a)=> `<span>${a}</span>`)
    
    // if (data.borders) {
    // let borders=data.borders.map((a)=>`<span>${a}</span>`)
    // }
    // else {
    //     data.borders=`<span>no border</span>`
    // }
    if(!data.borders) {
        data.borders=`<span>No border</span>`
    }
    
    return ` <div class="main-content">
    <div class="main-content__img">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="main-content__items">

        <div class="main-content__items_left">
            <h2 class="country-box__name_title details__name_title">${data.name.common}</h2>

            <p class="items">Native Name:<span>${data.name.official}</span></p>
            <p class="items">Population:<span>${data.population}</span></p>
            <p class="items">Region:<span>${data.region}</span></p>
            <p class="items">Sub Region :<span>${data.subregion}</span></p>
            <p class="items">Capital:<span>${data.capital}</span></p>
            <p class="items">Border:<span>${data.borders}</span></p>
        </div>
        <div class="main-content__items_right">
            <p class="items">Top Level Domain:<span></span></p>
            <p class="items">Curriencies:<span></span></p>
            <p class="items">Languages:<span></span></p>
        </div>
    </div>
</div>`
}



