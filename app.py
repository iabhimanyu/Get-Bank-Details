from flask import Flask ,request,render_template,jsonify
app=Flask(__name__)
import sqlite3,csv
connection=sqlite3.connect("bank.db",check_same_thread=False)
cur=connection.cursor()
# '''cur.execute('''create table details(ifsc text,bank_id int,branch text,address text,city text,district text,state text,bank_name text)''')
# #with open('bank_branches.csv',encoding='utf8') as cs:
#     #csv_reader = csv.reader(cs,delimiter=',')
#     #c=0
#     # for row in csv_reader:
#     #     cur.execute("insert into details values (?,?,?,?,?,?,?,?)",row)
#     # connection.commit()

        
#     #print(f'Processed {c} lines.') 
#             #cur.execute(f"INSERT INTO details VALUES'({row[ifsc]})") '''

  #  connection.commit()
@app.route('/')
def homepage():
    return render_template('home.html')
@app.route("/ifsc",methods=["POST"])
def ifsc():
    ifsc = request.form.get("ifsc").strip().upper()
    print(ifsc)
    
    cur.execute(f"SELECT * FROM details where ifsc='{ifsc}'")
   # print(cur.fetchone())
    x=cur.fetchone()
    if(x==None):
        res = jsonify({"status":"failed"})
        return res
    res = jsonify({"status":"ok","bank_id":x[1], "branch":x[2], "address":x[3], "city":x[4], "district":x[5], "state":x[6], "bank_name":x[7]})
    return res
@app.route("/citybank",methods=["POST"])
def BankDetails():
    bank=request.form.get("bank").strip().upper()
    city=request.form.get("city").strip().upper()
   
    cur.execute(f"SELECT * FROM details where city='{city}' and bank_name='{bank}'")
    x=cur.fetchall()
    if(len(x)==0):
        res = jsonify({"status":"failed"})
        return res



    results ={"status":"ok"}
    c=1
    for j in x:
        res = {"ifsc":j[0],"branch":j[2],"address":j[3],"city":j[4],"district":j[5],"state":j[6],"bank_name":j[7]}
        results[f"{c}"]=res
        c+=1
    return jsonify(results)
    
if __name__=='__main__':
    print("Hosting....")
    app.run(debug=True)





