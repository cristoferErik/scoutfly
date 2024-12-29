import { pageLinks } from "../app/interfaces/ClientInt.js";

let imageUrl: string = "/assets/images/pagination";

export function Pagination(pagesLinks:pageLinks,container:HTMLElement) {
    let pagination = container.querySelector(".pagination");
    if (!pagination) return;
    pagination.innerHTML=``;
    if (pagesLinks.first) {
        const first = document.createElement("button");
        first.className = "page-link active";
        first.type = "button";
        first.value = pagesLinks.first;
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-s2.svg`;
            first.appendChild(img);
        }
        pagination.appendChild(first);
    } else {
        const first = document.createElement("span");
        first.className = "page-link opaque";
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src =  `${imageUrl}/angulo-s2.svg`;
            first.appendChild(img);
        }
        pagination.appendChild(first);
    }
    if (pagesLinks.prev) {
        const prev = document.createElement("button");
        prev.className = "page-link active";
        prev.type = "button";
        prev.value = pagesLinks.prev;
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-s.svg`;
            prev.appendChild(img);
        }
        pagination.appendChild(prev);
    } else {
        const prev = document.createElement("span");
        prev.className = "page-link opaque";
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-s.svg`;
            prev.appendChild(img);
        }
        pagination.appendChild(prev);
    }
    if (pagesLinks.numbers.length > 0) {
        pagesLinks.numbers.forEach((link) => {
            if (link.actual) {
                const actual = document.createElement("span");
                actual.className = "page-link actual";
                actual.textContent = link.page;
                pagination.appendChild(actual);
            }else{
                const actual = document.createElement("button");
                actual.className = "page-link active";
                actual.value = link.link;
                actual.textContent=link.page;
                pagination.appendChild(actual);
            }
        });
    }
    if(pagesLinks.next){
        const next = document.createElement("button");
        next.className = "page-link active";
        next.type = "button";
        next.value = pagesLinks.next;
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-d.svg`;
            next.appendChild(img);
        }
        pagination.appendChild(next);
    }else{
        const next = document.createElement("span");
        next.className = "page-link opaque";
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-d.svg`;
            next.appendChild(img);
        }
        pagination.appendChild(next);
    }
    if(pagesLinks.last){
        const last = document.createElement("button");
        last.className = "page-link active";
        last.type = "button";
        last.value = pagesLinks.last;
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-d2.svg`;
            last.appendChild(img);
        }
        pagination.appendChild(last);
    }else{
        const last = document.createElement("span");
        last.className = "page-link opaque";
        {
            const img = document.createElement("img");
            img.className = "icon";
            img.src = `${imageUrl}/angulo-d2.svg`;
            last.appendChild(img);
        }
        pagination.appendChild(last);
    }
}
