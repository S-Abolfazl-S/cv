document.addEventListener('DOMContentLoaded', e => {
    // setup nav
    const toggle_navbar = document.getElementById("toggle-nav");
    const btn_nav = document.querySelector('.btn-nav');
    const nav_pane = document.querySelector("#navbar>nav");

    const navConfig = () => {
        // config show or hide nav button
        // config nav when load page or resize page 

        if (window.innerWidth > 768) {
            toggle_navbar.checked = true;
            btn_nav.style.display = 'none';
            nav_pane.style.cssText = `
                background: transparent;
                box-shadow: none;
            `;
        } else {
            toggle_navbar.checked = false;
            btn_nav.style.display = 'flex';
            nav_pane.style.cssText = `
                background: #fff;
                box-shadow: 0 5px 10px #bfbfbf;
            `;
        }

    };

    navConfig();



    window.addEventListener('resize', e => {
        navConfig();
    });


    document.addEventListener('scroll', e => {
        if (window.innerWidth > 768) {
            if (window.scrollY > 30) {
                nav_pane.style.cssText = ` background: #fff; box-shadow: 0 5px 10px #bfbfbf; `;
            } else if (window.scrollY > 0) {
                nav_pane.style.cssText = ` background: transparent; box-shadow: none; `;
            }
        }
    });


    // config nav link's
    const nav_links = document.querySelectorAll("#navbar>nav>ul>li>a");
    nav_links.forEach(link => {
        link.onclick = e => {
            setTimeout(() => {
                // used of setTimeout for update scrollY 
                if (!link.querySelector("i").classList.contains("fa-link")) {
                    window.scrollTo(0, window.scrollY - 50);
                }
                if (window.innerWidth < 768 && document.querySelector("#toggle-nav").checked == true) {
                    document.querySelector("#toggle-nav").checked = false;
                }
            }, 10);
        };
    });


    // 
    read_data();


});

const read_data = () => {
    // about
    document.querySelector("#p-name>span").innerHTML = my_info.about.full_name;
    document.querySelector("#p-military-status>span").innerHTML = my_info.about.military_status;
    document.querySelector("#p-email>span").innerHTML = my_info.about.email;
    document.querySelector("#p-loc>span").innerHTML = my_info.about.loc;
    document.querySelector("#p-phone>span").innerHTML = my_info.about.phone_number;
    document.querySelector("#p-birth>span").innerHTML = my_info.about.birth;
    document.querySelector("#job-pos").innerHTML = my_info.about.field;
    document.querySelector("#img-pane>img").src = my_info.about.image_address;
    document.querySelector("#summary-pane").innerHTML = my_info.about.summary;
    // job
    document.querySelector("#job-pane>p.content-pane").innerHTML = my_info.job.description;
    // add project's
    Object.entries(my_info.projects).forEach(project => {
        addNewProject(
            project_name = project[0],
            technology_list = project[1].technologies,
            project_description = project[1].description,
            {
                link_name: project[1].link_name,
                link_url: project[1].link_url
            });

    });
    // education
    document.querySelector("#education-pane>.content-pane>h1").innerHTML = my_info.education.title;
    document.querySelector("#education-pane>.content-pane>p>span:nth-child(1)").innerHTML = my_info.education.collage;
    document.querySelector("#education-pane>.content-pane>p>span:nth-child(2)").innerHTML = my_info.education.average;
    document.querySelector("#education-pane>.content-pane>p>span:nth-child(3)")
        .innerHTML = `${my_info.education.start} _ ${my_info.education.end}`;

    // add skill's
    const skillsPane = document.querySelector("#skills-pane>.content-pane");
    Object.entries(my_info.skills).forEach(skill => {
        addNewSkill(parentPane = skillsPane, skillName = skill[0], skillLevel = skill[1]);
    });
    // add languages
    const languagesPage = document.querySelector("#languages-pane>.content-pane");
    addNewSkill(parentPane = languagesPage, skillName = Object.entries(my_info.languages)[0][0], skillLevel = Object.entries(my_info.languages)[0][1]);

    // fill progress bar 
    let stop = setInterval(() => {
        if (window.scrollY >= 2000 || (window.scrollY >= 1600 && window.innerWidth >= 768)) {
            setTimeout(() => {
                document.querySelectorAll(".progress-bar").forEach(elem => {
                    elem.style.display = 'flex';
                });
                languagesPage.querySelector(".skill-pane>.progress-bar").style.display = 'flex';
                clearInterval(stop);
            }, 300);
        }
    }, 10);


    // add certificates
    const certificatesPane = document.querySelector("#certificates-pane>.content-pane")
    Object.entries(my_info.certificates).forEach(certificate => {
        addNewCertificate(
            parent_pane = certificatesPane,
            certificate_name = certificate[0],
            academy_name = certificate[1].academy,
            certificate_score = certificate[1].score,
        );
    });

    // add link's

    const linksPane = document.querySelector("#links-pane>.content-pane");
    Object.entries(my_info.links).forEach(link => {
        addNewLink(
            parent_pane = linksPane,
            link_name = link[0],
            link_src = link[1].url,
            font_icon = link[1].font_icon,
            color_icon = link[1].color_icon
        );
    });
};

const addNewProject = (project_name, technology_list, project_description, { link_name, link_url }) => {
    const projectsPane = document.querySelector("#projects-pane>.content-pane");

    const title = document.createElement("span");
    title.setAttribute("class", "title-pane");
    title.innerHTML = project_name;

    const technologies = document.createElement("span");
    technologies.setAttribute("class", "title-pane");
    technologies.innerHTML = technology_list;

    const title_pane = document.createElement("p");
    title_pane.appendChild(title);
    title_pane.appendChild(technologies);

    const description = document.createElement("p");
    description.innerHTML = project_description;

    const link = document.createElement("a");
    link.setAttribute("href", link_url);

    const icon = document.createElement("i");
    icon.setAttribute("class", "fab fa-github");

    link.appendChild(icon);
    link.append(link_name.replace(/^/, " "));

    const project_pane = document.createElement("div");
    project_pane.setAttribute("class", "project-pane content-pane");
    project_pane.appendChild(title_pane);
    project_pane.appendChild(description);
    project_pane.appendChild(link);

    projectsPane.appendChild(project_pane);
};

const addNewSkill = (parent_pane, skillName, skillLevel) => {

    const skill_pane = document.createElement("div");
    skill_pane.setAttribute("class", "skill-pane");

    const skill_name = document.createElement("span");
    skill_name.innerHTML = skillName;

    const skill_level = document.createElement("div");
    skill_level.setAttribute("class", "progress-bar");
    skill_level.setAttribute("style", `--progress-width: ${skillLevel}`);


    skill_pane.appendChild(skill_name);
    skill_pane.appendChild(skill_level);

    parent_pane.insertBefore(skill_pane, parent_pane.lastElementChild);
};

const addNewCertificate = (parent_pane, certificate_name, academy_name, certificate_score) => {
    const certificate_pane = document.createElement("div");
    certificate_pane.setAttribute("class", "certificate-pane");

    const title = document.createElement("h1");
    title.innerHTML = certificate_name;


    const academy = document.createElement("span");
    academy.innerHTML = "آموزشگاه: "
    academy.innerHTML += (academy.cloneNode(false)).innerHTML = academy_name;

    const score = document.createElement("span");
    score.innerHTML = "نمره: "
    score.innerHTML += (score.cloneNode(false)).innerHTML = certificate_score;

    const content_pane = document.createElement("p");
    content_pane.appendChild(academy);
    content_pane.appendChild(score);

    certificate_pane.appendChild(title);
    certificate_pane.appendChild(content_pane);

    parent_pane.appendChild(certificate_pane);
};

const addNewLink = (parent_pane, link_name, link_src, font_icon, color_icon) => {
    const icon = document.createElement("i");
    icon.setAttribute("class", font_icon);
    icon.setAttribute("style", color_icon.replace(/^/, "color:"));

    const link = document.createElement("a");
    link.append(icon, link_name.replace(/^/, " "));
    link.href = link_src;

    const link_pane = document.createElement("p");
    link_pane.setAttribute("class", "link-pane");
    link_pane.appendChild(link);

    parent_pane.appendChild(link_pane);
};


const my_info = {
    "about": {
        "image_address": "./assets/fontawesome/svg/circle-user-solid.svg",
        "full_name": "سید ابوالفضل شاه چراغ",
        "field": "front end developer",
        "loc": "استان سمنان",
        "email": "s.abolfazl.s.se@gmail.com",
        "phone_number": "09107196909",
        "birth": "1375",
        "military_status": "معافیت",
        "summary": "برنامه نویس فرانت اند حدود شش ماه است که وارد این حوزه شده ام و علاقه مند به یادگیری و کار تیمی هستم و به دنبال پیشرفت در این حوزه هستم."
    },
    "job": {
        "description": "در حال حاضر مشغول به کار نیستم و به دنبال کار می گردم."
    },
    "education": {
        "title": "کارشناسی مهندسی تکنولوژی نرم افزار",
        "start": "1396/7",
        "end": "1398/4",
        "collage": "غیر انتفاعی توران",
        "average": "17.93"
    },
    "languages": {
        "english": "20",
    },
    "skills": {
        "html": "70",
        "css": "60",
        "javascript": "50",
        "git": "35",
        "sql": "20",
        "python": "20",
        "cli": "20",
    },
    "projects": {
        "tic tac toe": {
            "description": "در این بازی هر کدام از نفرات که زودتر سه مهره خود را در یک خط قرار دهند برنده بازی می شوند.",
            "technologies": "html css javascript",
            "link_name": "github",
            "link_url": "https://github.com/s-abolfazl-s/tic-tac-toe"
        },
        "weather forecast": {
            "description": "شما با استفاده از این وب سایت می توایند منطقه مورد نظرتان را جستجو کرده و از وضع آب و هوای ان مطلع شود.",
            "technologies": "html css javascript jquery",
            "link_name": "github",
            "link_url": "https://github.com/s-abolfazl-s/weather-forecast"
        },
        "quiz": {
            "description": "در ابتدای ورود به سایت ابتدا از کاربر مشخصاتی گرفته می شود تا هر کاربری وارد امتحان نشود. بعد ورود به امتحان کاربر تا زمان تعیین شده می تواند جواب سوالات را وارد نماید و بعد اتمام زمان نتیجه امتحان داده می شود.",
            "technologies": "html css javascript",
            "link_name": "github",
            "link_url": "https://github.com/s-abolfazl-s/quiz"
        },
        "ip loc": {
            "description": "وب سایت گرفتن اطلاعات ip، با استفاده از این وب سایت شما می توانید آدرس ip مورد نظرتان را جستجو کرده تا اطلاعات لازم را از موقعیت ip بدست اورید.",
            "technologies": "html css javascript",
            "link_name": "github",
            "link_url": "https://github.com/s-abolfazl-s/ip-loc"
        },
        "scientific calculator": {
            "description": "ماشین حساب مهندسی، دارای کلید های میانبر و پایگاه داده برای ذخیره اطلاعات.",
            "technologies": "python tkinter sqlite",
            "link_name": "github",
            "link_url": "https://github.com/s-abolfazl-s/scientific_calculator"
        }
    },
    "certificates": {
        "javascript": {
            "academy": "فنی حرفه ای",
            "score": "92"
        },
        "python": {
            "academy": "جهش",
            "score": "80"
        },
    },
    "links": {
        "github": {
            "url": "https://github.com/s-abolfazl-s/",
            "font_icon": "fab fa-github fa-lg",
            "color_icon": "#000"
        },
        "whatsapp": {
            "url": "#",
            "font_icon": "fab fa-whatsapp fa-lg",
            "color_icon": "#2BD348"
        },
    }
}

Object.freeze(my_info);