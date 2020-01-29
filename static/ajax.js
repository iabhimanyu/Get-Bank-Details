
    document.addEventListener('DOMContentLoaded',() => {
        document.querySelector('#form').onsubmit=() => {
            const request =new XMLHttpRequest();
            const ifsc = document.querySelector("#ifsc").value;
           // alert(ifsc);
            request.open('POST','/ifsc');
            request.onload = () => {
               const ifsc = document.querySelector("#ifsc").value;
                const res = JSON.parse(request.responseText);
                if(res.status=="ok"){console.log(res) ;
                    x=document.querySelector("#myDIV");
                    x.style.display = "block";
                    w=document.querySelector("#warn");
                    w.style.display = "none";
         //   document.querySelector("#ifs1").innerHTML=res.bank_id
document.querySelector("#ifs2").innerHTML=res.branch
document.querySelector("#ifs3").innerHTML=res.address
document.querySelector("#ifs4").innerHTML=res.city
document.querySelector("#ifs5").innerHTML=res.district
document.querySelector("#ifs6").innerHTML=res.state
document.querySelector("#ifs7").innerHTML=res.bank_name

                }
                else {console.log("Failed!");
                w=document.querySelector("#warn");
                w.style.display = "block";
                x=document.querySelector("#myDIV");
                x.style.display = "none";
            
            
            }
            } 
        const data=new FormData();
        data.append('ifsc',ifsc);
        request.send(data);
        return false;
        
    }})