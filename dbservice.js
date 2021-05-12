const mysql=require('mysql');
const dotenv=require('dotenv');
let instance=null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
   // console.log('db ' + connection.state);
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve,reject) => {
                const query = "SELECT * FROM plays_info;";

                connection.query(query,(err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

          //  console.log(response);
            return response;

        }catch(error){
            console.log(error);
        }
    }

    async insertNewName(id,name, venue,time,seats,cost) {
        try{
            const dateAdded = new Date();
            const insertId = await new Promise((reject) =>{
                const query = "INSERT INTO plays_info (id,name,venue,time,seats,cost) VALUES(?,?,?,?,?,?);";
                connection.query(query, [id,name,venue,time,seats,cost],(err,result) => {
                 //   if(err) reject(new Error(err.message));
                  //  resolve(result.insertId);
                    if(err)
                    {
                        console.error(err.message);
                        throw err
                    }
                })
            })
            console.log(insertId);

        }catch(error){
            console.log(error);
        }
    }

    async deleteRowById(id){

        try{
            id=parseInt(id,10);
            console.log(id);
            const response = await new Promise((resolve,reject) => {
                const query = "DELETE FROM plays_info WHERE id = ?;";
    
                connection.query(query,[id],(err, result) => {
                   // if(err) reject(new Error(err.message));
                    //resolve(result.affectedRows);
                   // resolve(result);
                    if(err)
                    {
                       console.error(err.message);
                        throw err
                    }
                })
               
            });
            return response === 1 ? true : false; 
          //  console.log(insertId);

        }catch(error){
            console.log(error);
            return false;
        }
    }
}


module.exports = DbService;