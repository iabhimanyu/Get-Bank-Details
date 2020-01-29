
    document.addEventListener('DOMContentLoaded',() => {
        document.querySelector('#form2').onsubmit=() => {
            const request =new XMLHttpRequest();
           // const ifsc = document.querySelector("#ifsc").value;
            const bank = document.querySelector("#bank").value;
            const city = document.querySelector("#city").value;
           // alert(ifsc);
            request.open('POST','/citybank');
            
            request.onload = () => {
              // const ifsc = document.querySelector("#ifsc").value;
               const bank = document.querySelector("#bank").value;
               const city = document.querySelector("#city").value;

                const res = JSON.parse(request.responseText);
                if(res.status=="ok"){console.log(res) ;
                    w=document.querySelector("#warn2");
                    w.style.display = "none";
                    for (i in res){
                        console.log(res[i])
                        if(i!="status")
                    {    $("#ac").append(`<div class="card">
                    <div class="card-header" id="headingTwo">
                      <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${i}" aria-expanded="false" aria-controls="collapseTwo">
                        ${res[i].branch}
                        </button>
                      </h2>
                    </div>
                    <div id="${i}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                      <div class="card-body" id="lis">
                      <ul>
                    <li><b>IFSC : </b>${res[i].ifsc}</li>
                    <li><b>Address : </b>${res[i].address}</li>
                    <li><b>City: </b>${res[i].city}</li>
                    <li><b>District : </b>${res[i].district}</li>
                    <li><b>State : </b>${res[i].state}</li>
                    <li><b>Bank Name : </b>${res[i].bank_name}</li>
                        
                      </ul>
                  
                      </div>
                    </div>
                  </div>`);
                    
                }
                    
                    }
         
                    x=document.querySelector("#myDIV2");
                    x.style.display = "block";    
                }
                else {console.log("Failed!");
                w=document.querySelector("#warn2");
                w.style.display = "block";
                x=document.querySelector("#myDIV2");
                x.style.display = "none";
            }
            } 
        const data=new FormData();
        data.append('city',city);
        data.append('bank',bank);
        request.send(data);
        return false;
        
    }})