// Data for the "HTML Images"
var images = [{
        // Image_1
        price: " 80 / night ",
        caption: "Jungle Cottage hosted by Daniel",
        alt: "Slide_image_1.jpg",
        bedroom: " 3 bedrooms ",
        bath: " 2 Bathroom",
        src: ["data/img/Slide_image_1.jpg", ],
        wifi: " WI-FI: No",
        location: " Montreal / Quebec",
        description: "Grass Hill village with great views of jungles",
        notify: "<Hover on the image for more details>",

    },

    {
        // Image_2
        price: " 200 / night ",
        caption: "Snowy villa hosted by Jack",
        alt: "Slide_image_2.jpg",
        bedroom: " 4 bedrooms ",
        bath: " 3 Bathroom",
        src: ["data/img/Slide_image_2.jpg"],
        wifi: " WI-FI: Yes",
        location: " Vancouver / B.C",
        description: "Snowy freezing Hill with cozy fireplace",
        notify: "<Hover on the image for more details>",
    },
    {
        // Image_3
        price: " 125 / night",
        caption: "Bubble house hosted by Alicia",
        alt: "Slide_image_3.jpg",
        bedroom: " 1 bedrooms ",
        bath: " 1 Bathroom",
        src: ["data/img/Slide_image_3.jpg"],
        wifi: " WI-FI: No",
        location: " London / Ontario",
        description: "Displaying  views of shiny stars within sphere windows",
        notify: "<Hover on the image for more details>",
    },
    {
        // Image_4
        price: " 65 / night ",
        caption: "Townhouse hosted by Zack",
        alt: "Slide_image_4.jpg",
        bedroom: " 1 bedrooms ",
        bath: " 1 Bathroom",
        src: ["data/img/Slide_image_4.jpg"],
        wifi: " WI-FI: Yes",
        location: " Toronto / Ontario",
        description: "Attached house with nice neighbors",
        notify: "<Hover on the image for more details>",
    },
    {
        // Image_5
        price: " 70 / night",
        caption: "Bungalow hosted by Julie",
        alt: "Slide_image_5.jpg",
        bedroom: " 2 bedrooms ",
        bath: " 2 Bathroom",
        src: ["data/img/Slide_image_5.jpg"],
        wifi: " WI-FI: No",
        location: " Montreal / Quebec",
        description: "Good for having family trip",
        notify: "<Hover on the image for more details>",
    },
    {
        // Image_6
        price: " 280 / night",
        caption: "Tropical villa hosted by Ali",
        alt: "Slide_image_6.jpg",
        bedroom: " 6 bedrooms ",
        bath: " 4 Bathroom",
        src: ["data/img/Slide_image_6.jpg"],
        wifi: " WI-FI: Yes",
        location: " Ottawa / Ontario",
        description: "Good for swimming pool party during summer ",
        notify: "<Hover on the image for more details>",
    },
];

window.onload = () => {
    let myImgs = document.getElementById("image");
    for (let i = 0; i < images.length; i++) {
        let a = document.createElement("figure");
        let b = document.createElement("figcaption");
        let c = document.createTextNode(images[i].caption);
        let d = document.createElement("img");
        decoration_1(a, d, b);
        d.setAttribute("src", images[i].src[0]);
        d.setAttribute("alt", images[i].alt);
        a.appendChild(b);
        b.appendChild(c);
        a.appendChild(d);
        let div = document.createElement("div");
        let para = document.createElement("p");
        let para2 = document.createElement("p");
        let para3 = document.createElement("p");
        let para4 = document.createElement("p");
        let para5 = document.createElement("p");
        let icon = document.createElement("i");
        let icon2 = document.createElement("i");
        let icon3 = document.createElement("i");
        let icon4 = document.createElement("i");
        let icon5 = document.createElement("i");
        icon.className = "fas fa-dollar-sign";
        icon2.className = "fas fa-bed";
        icon3.className = "fas fa-bath";
        icon4.className = "fas fa-wifi";
        icon5.className = "fa fa-map-marker";
        icon.style.color = "red";
        para.style.border = "white 5px outset";
        para.style.padding = "10px";
        para.style.backgroundColor = "black";
        icon2.style.color = "red";
        para2.style.border = "white 5px outset";
        para2.style.padding = "10px";
        para2.style.backgroundColor = "black";
        icon3.style.color = "red";
        para3.style.border = "white 5px outset";
        para3.style.padding = "10px";
        para3.style.backgroundColor = "black";
        icon4.style.color = "red";
        para4.style.border = "white 5px outset";
        para4.style.padding = "10px";
        para4.style.backgroundColor = "black";
        icon5.style.color = "red";
        para5.style.border = "white 5px outset";
        para5.style.padding = "10px";
        para5.style.backgroundColor = "black";
        let text2 = document.createTextNode(" Price:  " + images[i].price);
        let bed = document.createTextNode(images[i].bedroom);
        let bath_var = document.createTextNode(images[i].bath);
        let wifi = document.createTextNode(images[i].wifi);
        let location = document.createTextNode(images[i].location);
        let text_desc = document.createTextNode(images[i].description);
        let p_notify = document.createElement("p");

        let notify_desc = document.createTextNode(images[i].notify);

        let div_main = document.createElement("div");


        decoration_2(div_main, div);
        //------------------------------------------
        para.appendChild(icon);
        para.appendChild(text2);
        para2.appendChild(icon2);
        para2.appendChild(bed);
        para3.appendChild(icon3);
        para3.appendChild(bath_var);
        para4.appendChild(icon4);
        para4.appendChild(wifi);
        para5.appendChild(icon5);
        para5.appendChild(location);
        div.appendChild(para);
        div.appendChild(para2);
        div.appendChild(para3);
        div.appendChild(para4);
        div.appendChild(para5);
        div_main.appendChild(div);
        //-----------------------------------------
        
        let p = document.createElement("p");
        p.classList.add("para_responsive");
        p.style.color = "white";
        p_notify.classList.add("para_responsive_2");
        p_notify.style.color = "red";
        p_notify.style.paddingBottom = "5px";
        p.style.textAlign = "center";
        p_notify.style.textAlign = "center";
        p.appendChild(text_desc);
        a.appendChild(p);
        p_notify.appendChild(notify_desc);
        a.appendChild(p_notify);
        a.appendChild(div_main);
        myImgs.appendChild(a);

    }
};

let decoration_1 = function (figure, img, figcaption) {
    img.classList.add("Size_image");
    figcaption.classList.add("caption");
    figure.classList.add("image_whole");
};

let decoration_2 = (div, data_para) => {
    div.classList.add("overlay");
    data_para.classList.add("DIV");
};

/*------------------------------------------------------------*/