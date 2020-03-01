const michelin = require('./bibmichelin.json')
const maitres = require('./maitre.json')

module.exports.get = async() =>{

    maitres[0].splice(0,1)
    let bib_maitre = []
    for(var idx=0; idx<michelin.length;idx++){
    /*let ad = michelin[idx][0].adress 
    let adress =ad.replace(/ /g,"") 
    let badress = adress.split(",") 
    let bib_adress = badress[0] +badress[2]
    //console.log(bib_adress) */

        let nu = michelin[idx][0].number
        let number= nu.replace(/ /g,"")
        let bib_number = number.replace("+33","")
    
    //console.log(bib_number)

        for(var i=0; i<maitres.length;i++){
            for(var j=0;j<maitres[0].length;j++){      
            /*let m = maitres[i][j].adress
            let maitre_adress = m.replace(/ /g, "")
            //console.log(maitre_adress) */
                let maitre_number
                if(maitres[i][j] != undefined ){
                    let n  = maitres[i][j].number
                    let num = n.replace(/ /g, "")
                    maitre_number = num.substring(1)

                }
            
            //console.log(maitre_number)
            //maitre_adress.includes(bib_adress) &&
                if(  bib_number === maitre_number ){
                    bib_maitre.push(michelin[idx][0])
                }
            }
        }
    }

    console.log(bib_maitre) 
    console.log(bib_maitre.length) 
    return bib_maitre;



}
