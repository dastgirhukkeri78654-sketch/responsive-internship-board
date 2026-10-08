const internshipRecords=[
{id:"INT-101",title:"Frontend Intern",domain:"Full Stack Development",mode:"Remote",location:"India",skills:["HTML","CSS","JavaScript"],openings:3},
{id:"INT-102",title:"API Engineering Intern",domain:"Full Stack Development",mode:"Hybrid",location:"Pune",skills:["Node.js","SQL","Testing"],openings:2},
{id:"INT-103",title:"UI/UX Intern",domain:"UI/UX",mode:"Remote",location:"India",skills:["Figma","Research","Accessibility"],openings:1},
{id:"INT-104",title:"Data Analyst Intern",domain:"Data Analytics",mode:"On-site",location:"Bengaluru",skills:["Excel","SQL","Data visualisation"],openings:2},
{id:"INT-105",title:"Security Operations Intern",domain:"Cyber Security",mode:"Remote",location:"India",skills:["Linux","Logs","Networking"],openings:1}
];

const list=document.querySelector("#internship-list");
const searchInput=document.querySelector("#search-input");
const domainFilter=document.querySelector("#domain-filter");
const clearButton=document.querySelector("#clear-button");
const emptyState=document.querySelector("#empty-state");
const errorState=document.querySelector("#error-state");
const retryButton=document.querySelector("#retry-button");
const resultCount=document.querySelector("#result-count");

function populateDomains(records){
 const domains=[...new Set(records.map(item=>item.domain))].sort();
 domainFilter.innerHTML='<option value="all">All domains</option>';
 domains.forEach(domain=>{const option=document.createElement("option");option.value=domain;option.textContent=domain;domainFilter.appendChild(option);});
}

function createCard(item){
 const article=document.createElement("article");article.className="card";article.tabIndex=0;
 const top=document.createElement("div");top.className="card-top";
 const title=document.createElement("h3");title.textContent=item.title;
 const badge=document.createElement("span");badge.className="badge";badge.textContent=item.domain;
 top.append(title,badge);
 const mode=document.createElement("p");mode.className="meta";mode.textContent=`${item.mode} · ${item.location}`;
 const skillsLabel=document.createElement("p");skillsLabel.className="meta";skillsLabel.textContent="Skills";
 const skills=document.createElement("div");skills.className="skills";skills.setAttribute("aria-label",`${item.title} skills`);
 item.skills.forEach(skillName=>{const skill=document.createElement("span");skill.className="skill";skill.textContent=skillName;skills.appendChild(skill);});
 const openings=document.createElement("p");openings.className="openings";openings.textContent=`${item.openings} opening${item.openings===1?"":"s"} · ${item.id}`;
 article.append(top,mode,skillsLabel,skills,openings);return article;
}

function render(records){
 list.innerHTML="";emptyState.hidden=records.length!==0;resultCount.textContent=`${records.length} result${records.length===1?"":"s"}`;
 const fragment=document.createDocumentFragment();records.forEach(item=>fragment.appendChild(createCard(item)));list.appendChild(fragment);
}

function filterRecords(){
 const query=searchInput.value.trim().toLowerCase();const selectedDomain=domainFilter.value;
 const filtered=internshipRecords.filter(item=>{
  const searchable=[item.title,item.domain,item.mode,item.location,...item.skills].join(" ").toLowerCase();
  return searchable.includes(query)&&(selectedDomain==="all"||item.domain===selectedDomain);
 });
 render(filtered);
}

function initialise(){
 try{
  if(!Array.isArray(internshipRecords))throw new Error("Internship data is unavailable.");
  populateDomains(internshipRecords);errorState.hidden=true;filterRecords();
 }catch(error){list.innerHTML="";emptyState.hidden=true;errorState.hidden=false;resultCount.textContent="";}
}
searchInput.addEventListener("input",filterRecords);
domainFilter.addEventListener("change",filterRecords);
clearButton.addEventListener("click",()=>{searchInput.value="";domainFilter.value="all";searchInput.focus();filterRecords();});
retryButton.addEventListener("click",initialise);
initialise();