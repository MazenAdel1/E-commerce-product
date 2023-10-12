let currentIndex = 0;

let arrayOfProducts = [];

let cartButton = document.querySelector(`.cart-button`),
  cartList = document.querySelector(`.cart-list`);

// toggle the cart
cartButton.onclick = () => {
  cartList.classList.toggle(`hidden`);
};
//

let quantity = document.querySelector(`.quantity`),
  minus = document.querySelector(`.minus-button`),
  plus = document.querySelector(`.plus-button`);

// increase and decrease the quantity of the product
plus.onclick = () => {
  quantity.innerHTML++;
};

minus.onclick = () => {
  if (quantity.innerHTML != 0) {
    quantity.innerHTML--;
  }
};
//

let cartProductName = document.querySelector(`.cart-product-name`),
  cartProductPrice = document.querySelector(`.cart-product-price`),
  cartProductQuantity = document.querySelector(`.cart-product-quantity`),
  cartProductFinalPrice = document.querySelector(`.cart-product-final-price`),
  cartEmptyMessage = document.querySelector(`.cart-empty-message`);

let addToCartButton = document.querySelector(`.add-to-cart`);

let cartProductsContainer = document.querySelector(`.cart-products`);

// create the elements in the cart
let cartPopup = document.querySelector(`.cart-popup`);
addToCartButton.onclick = () => {
  if (quantity.innerHTML != 0) {
    let productContainer = document.createElement(`div`),
      productFullInfoContainer = document.createElement(`div`),
      productImg = document.createElement(`img`),
      productInfoContainer = document.createElement(`div`),
      productName = document.createElement(`span`),
      productMainPrice = document.createElement(`span`),
      productQuantity = document.createElement(`span`),
      productFullPrice = document.createElement(`span`),
      deleteButton = document.createElement(`button`),
      deleteIcon = document.createElement(`img`),
      checkOut = document.createElement(`button`);

    cartEmptyMessage.classList.add(`hidden`);

    cartPopup.classList.remove(`hidden`);
    cartPopup.innerHTML = +cartPopup.innerHTML + +quantity.innerHTML;

    productContainer.className = `mb-5`;

    productFullInfoContainer.className = `flex w-full items-center justify-between gap-4 pb-5 md:justify-normal`;

    productImg.className = `w-12 rounded-md`;

    productInfoContainer.className = `flex flex-col`;

    checkOut.className = `w-full rounded-lg bg-orange py-4 text-white hover:bg-[#f9a05c] transition`;

    productImg.src = `./images/image-product-1-thumbnail.jpg`;
    productImg.alt = `product image`;

    productName.innerHTML = `${
      document.querySelector(`.product-name`).innerHTML
    }`;

    productMainPrice.innerHTML = `<span>${
      document.querySelector(`.product-price`).innerHTML
    }</span> x `;

    productQuantity.innerHTML = `${quantity.innerHTML} `;

    productFullPrice.innerHTML = ` $${
      parseInt(productMainPrice.children[0].innerHTML.slice(1)) *
      parseInt(productQuantity.innerHTML)
    }.00`;

    productFullPrice.className = `font-bold`;

    deleteIcon.src = `./images/icon-delete.svg`;
    deleteIcon.alt = `delete`;

    deleteButton.addEventListener(`click`, () => {
      for (let i = 0; i < arrayOfProducts.length; i++) {
        if (
          deleteButton.parentElement.parentElement.getAttribute(`data-id`) ==
          arrayOfProducts[i].pId
        ) {
          let del;
          del = arrayOfProducts.splice(i, 1);
        }
        localStorage.setItem(`products`, JSON.stringify(arrayOfProducts));
      }

      deleteButton.parentElement.parentElement.remove();

      let result = 0;
      for (let i = 0; i < arrayOfProducts.length; i++) {
        result += +arrayOfProducts[i].pQuantity;
      }

      cartPopup.innerHTML = result;

      if (cartProductsContainer.children.length == 0) {
        cartEmptyMessage.classList.remove(`hidden`);
        cartPopup.classList.add(`hidden`);
        cartPopup.innerHTML = 0;
      }
    });

    deleteButton.appendChild(deleteIcon);

    checkOut.innerHTML = `Checkout`;

    productMainPrice.appendChild(productQuantity);
    productMainPrice.appendChild(productFullPrice);

    productInfoContainer.appendChild(productName);
    productInfoContainer.appendChild(productMainPrice);

    productFullInfoContainer.appendChild(productImg);
    productFullInfoContainer.appendChild(productInfoContainer);
    productFullInfoContainer.appendChild(deleteButton);

    productContainer.appendChild(productFullInfoContainer);
    productContainer.appendChild(checkOut);

    cartProductsContainer.appendChild(productContainer);

    dataObj = {
      pName: document.querySelector(`.product-name`).innerText,
      pPrice: productMainPrice.children[0].innerText,
      pQuantity: productQuantity.innerText,
      pFullPrice: productFullPrice.innerText,
      pId: Date.now(),
    };

    arrayOfProducts.push(dataObj);

    productContainer.setAttribute(`data-id`, dataObj.pId);

    localStorage.setItem(`products`, JSON.stringify(arrayOfProducts));
  }
};
//

let thumbnails = document.querySelectorAll(`.thumbnail`),
  productImage = document.querySelector(`.product-img`);

let mobileProductContainer = document.querySelector(`.mobile-product`);

let nextButton = document.querySelector(`.next-button`),
  prevButton = document.querySelector(`.prev-button`);

let mobileProductImages = document.querySelectorAll(`.mobile-product-img`);

thumbnails.forEach((el) => {
  el.addEventListener(`click`, () => {
    currentIndex = +el.getAttribute(`data-index`);
    updateTheProductImage();
  });
});

nextButton.addEventListener(`click`, () => {
  if (currentIndex < 3) {
    currentIndex++;

    updateTheProductImage();
  } else {
    currentIndex = 0;

    updateTheProductImage();
  }
});

prevButton.addEventListener(`click`, () => {
  if (currentIndex > 0) {
    currentIndex--;

    updateTheProductImage();
  } else {
    currentIndex = 3;

    updateTheProductImage();
  }
});

// update the product images function
function updateTheProductImage() {
  mobileProductImages.forEach((img) => {
    img.className = `mobile-product-img block transition-all -translate-x-[${
      100 * currentIndex
    }%]`;
  });
  for (let i = 0; i < thumbnails.length; i++) {
    if (thumbnails[i].classList.contains(`border-orange`)) {
      thumbnails[
        i
      ].className = `thumbnail relative cursor-pointer rounded-2xl before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:transition-all before:content-[''] hover:before:h-full hover:before:w-full`;
    }
    if (thumbnails[i].getAttribute(`data-index`) == currentIndex) {
      thumbnails[
        i
      ].className = `thumbnail relative cursor-pointer rounded-2xl border-[4px] border-orange before:absolute before:h-full before:w-full before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:content-['']`;
    }
  }
  productImage.src = `./images/image-product-${currentIndex + 1}.jpg`;
}
//

let mobileMenu = document.querySelector(`.mobile-menu`),
  menuButton = document.querySelector(`.menu-button`),
  menuCloseButton = document.querySelector(`.menu-close-button`);

// mobile menu toggle
menuButton.onclick = () => {
  mobileMenu.classList.remove(`hidden`);
  setTimeout(() => {
    mobileMenu.children[0].classList.remove(`-left-[231px]`);
    mobileMenu.children[0].classList.add(`left-0`);
  }, 1);
  document.children[0].classList.add(`overflow-y-hidden`);
};

menuCloseButton.onclick = () => {
  mobileMenu.children[0].classList.remove(`left-0`);
  mobileMenu.children[0].classList.add(`-left-[231px]`);
  setTimeout(() => {
    mobileMenu.classList.add(`hidden`);
    document.children[0].classList.remove(`overflow-y-hidden`);
  }, 300);
};
//

let lightboxIndex = 0;

let lightbox = document.querySelector(`.lightbox`),
  lightboxCloseButton = document.querySelector(`.lightbox-close-button`),
  lightboxNextButton = document.querySelector(`.lightbox-next-button`),
  lightboxPrevButton = document.querySelector(`.lightbox-prev-button`),
  lightboxProductImages = document.querySelectorAll(`.lightbox-product-img`),
  lightboxThumbnails = document.querySelectorAll(`.lightbox-thumbnail`);

productImage.onclick = () => {
  document.children[0].classList.add(`overflow-y-hidden`);
  lightbox.classList.remove(`md:hidden`);
  lightbox.classList.add(`md:block`);

  lightboxIndex = currentIndex;

  updateLightboxImages();
};

lightboxCloseButton.onclick = () => {
  document.children[0].classList.remove(`overflow-y-hidden`);
  lightbox.classList.add(`md:hidden`);
  lightbox.classList.remove(`md:block`);
};

lightboxNextButton.addEventListener(`click`, () => {
  if (lightboxIndex < 3) {
    lightboxIndex++;

    updateLightboxImages();
  } else {
    lightboxIndex = 0;

    updateLightboxImages();
  }
});

lightboxPrevButton.addEventListener(`click`, () => {
  if (lightboxIndex > 0) {
    lightboxIndex--;

    updateLightboxImages();
  } else {
    lightboxIndex = 3;

    updateLightboxImages();
  }
});

// change the style of the lightbox thumbnails on click
lightboxThumbnails.forEach((el) => {
  el.addEventListener(`click`, () => {
    for (let i = 0; i < lightboxThumbnails.length; i++) {
      if (lightboxThumbnails[i].classList.contains(`border-orange`)) {
        lightboxThumbnails[
          i
        ].className = `lightbox-thumbnail relative cursor-pointer rounded-2xl before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:transition-all before:content-[''] hover:before:h-full hover:before:w-full`;
      }
    }
    el.className = `lightbox-thumbnail relative cursor-pointer rounded-2xl border-[4px] border-orange before:absolute before:h-full before:w-full before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:content-['']`;

    lightboxIndex = el.getAttribute(`data-index`);

    lightboxProductImages.forEach((el) => {
      el.className = `lightbox-product-img block  rounded-xl transition-all -translate-x-[${
        100 * lightboxIndex
      }%]`;
    });
  });
});
//

// update the lightbox images function
function updateLightboxImages() {
  lightboxProductImages.forEach((el) => {
    el.className = `lightbox-product-img block  rounded-xl transition-all -translate-x-[${
      100 * lightboxIndex
    }%]`;
  });

  for (let i = 0; i < lightboxThumbnails.length; i++) {
    lightboxThumbnails[
      i
    ].className = `lightbox-thumbnail relative cursor-pointer rounded-2xl before:absolute before:left-1/2 before:top-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:transition-all before:content-[''] hover:before:h-full hover:before:w-full`;
  }

  lightboxThumbnails[
    lightboxIndex
  ].className = `lightbox-thumbnail relative cursor-pointer rounded-2xl border-[4px] border-orange before:absolute before:h-full before:w-full before:rounded-xl before:bg-[rgba(255,255,255,0.75)] before:content-['']`;
}
//

// get the cart info from local storage
if (localStorage.getItem(`products`)) {
  arrayOfProducts = JSON.parse(localStorage.getItem(`products`));
  for (let i = 0; i < arrayOfProducts.length; i++) {
    let productContainer = document.createElement(`div`),
      productFullInfoContainer = document.createElement(`div`),
      productImg = document.createElement(`img`),
      productInfoContainer = document.createElement(`div`),
      productName = document.createElement(`span`),
      productMainPrice = document.createElement(`span`),
      productQuantity = document.createElement(`span`),
      productFullPrice = document.createElement(`span`),
      deleteButton = document.createElement(`button`),
      deleteIcon = document.createElement(`img`),
      checkOut = document.createElement(`button`);

    cartEmptyMessage.classList.add(`hidden`);

    cartPopup.classList.remove(`hidden`);
    cartPopup.innerHTML = +cartPopup.innerHTML + +arrayOfProducts[i].pQuantity;

    productContainer.className = `cart-product-container mb-5`;

    productFullInfoContainer.className = `flex w-full items-center justify-between gap-4 pb-5 md:justify-normal`;

    productImg.className = `w-12 rounded-md`;

    productInfoContainer.className = `flex flex-col`;

    checkOut.className = `w-full rounded-lg bg-orange py-4 text-white hover:bg-[#f9a05c] transition`;

    productImg.src = `./images/image-product-1-thumbnail.jpg`;
    productImg.alt = `product image`;

    productName.innerHTML = arrayOfProducts[i].pName;

    productMainPrice.innerHTML = `<span>${arrayOfProducts[i].pPrice}</span> x `;

    productQuantity.innerHTML = arrayOfProducts[i].pQuantity;

    productFullPrice.innerHTML = arrayOfProducts[i].pFullPrice;

    productFullPrice.className = `font-bold`;

    deleteIcon.src = `./images/icon-delete.svg`;
    deleteIcon.alt = `delete`;

    deleteButton.addEventListener(`click`, () => {
      for (let i = 0; i < arrayOfProducts.length; i++) {
        if (
          deleteButton.parentElement.parentElement.getAttribute(`data-id`) ==
          arrayOfProducts[i].pId
        ) {
          let del;
          del = arrayOfProducts.splice(i, 1);
        }
        localStorage.setItem(`products`, JSON.stringify(arrayOfProducts));
      }

      deleteButton.parentElement.parentElement.remove();

      let result = 0;
      for (let i = 0; i < arrayOfProducts.length; i++) {
        result += +arrayOfProducts[i].pQuantity;
      }

      cartPopup.innerHTML = result;

      if (cartProductsContainer.children.length == 0) {
        cartEmptyMessage.classList.remove(`hidden`);
        cartPopup.classList.add(`hidden`);
        cartPopup.innerHTML = 0;
      }
    });

    deleteButton.appendChild(deleteIcon);

    checkOut.innerHTML = `Checkout`;

    productMainPrice.appendChild(productQuantity);
    productMainPrice.appendChild(productFullPrice);

    productInfoContainer.appendChild(productName);
    productInfoContainer.appendChild(productMainPrice);

    productFullInfoContainer.appendChild(productImg);
    productFullInfoContainer.appendChild(productInfoContainer);
    productFullInfoContainer.appendChild(deleteButton);

    productContainer.appendChild(productFullInfoContainer);
    productContainer.appendChild(checkOut);

    productContainer.setAttribute(`data-id`, arrayOfProducts[i].pId);

    cartProductsContainer.appendChild(productContainer);
  }
}
//
