
const generateReports = (events)=>{
    const now = Date.now(); 
    const domainMap = new Map(); 
    for(const e of events){
        const domain = e.meta.domain; 
        const title = e.page_title; 
        if(!domainMap[domain]){
            domainMap.set(domain, new Set()); 
        }
        domainMap.get(domain).add(title); 
    }

    let domainReport = Array.from(domainMap.entries()); 
    domainReport= domainReport.map(([domain, pages]) => ({ domain, count: pages.size }))
    .sort((a, b) => b.count - a.count);
    console.clear(); 
    console.log("\n============================================="); 
    console.log("Domain Reports "); 
    console.log(`Total no. of Wikipedia domains Updated : ${domainMap.size}`); 
    for(const {domain, count} of domainReport){
        console.log(`${domain}: ${count} pages updated`); 
    }
    const userMap = new Map(); 
    for(const e of events){
        const domain = e.meta.domain; 
        const performer = e.performer; 
        if(domain==='en.wikipedia.org' && performer.user_is_bot===false && performer.user_text){
            const username = performer.user_text; 
            const editCount = performer.user_edit_count || 0 ; 
            if(!userMap[userMap] || editCount> userMap.get(userMap)){
                userMap.set(username, editCount); 
            }
        }
    }
    let  userReport = Array.from(userMap.entries()); 
    userReport= userReport.map(([user, count]) => ({ user, count }))
    .sort((a, b) => b.count - a.count);
    console.log(`\n Users who made changes to en.wikipead.org`); 
    for(const {user, count} of userReport){
        console.log(`${user}:${count}`); 
    }
    console.log("reports end here!!"); 

}
export default generateReports; 