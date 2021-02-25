class ServicesController {
    constructor() {}
    index(req, res) {
    res.status(200).json({ serverResponse: "hola mundo" });
    }
    test(req, res) {
        req.body["msn"] = "Por el servidor";
        const data = req.body;
        console.log(data);
        res.status(200).json(data);
    } 
    divisas(req, res)
    {
        var param=req.body;
        if(param.moneOriginal == null){
            res.status(200).json({msn: 'Es necesario el parametro moneOriginal'});
            return;
        }
        if(param.cantidad == null){
            res.status(200).json({msn: 'Es necesario el parametro cantidad'});
            return;
        }
        if(param.moneCambio == null){
            res.status(200).json({msn: 'Es necesario el parametro moneCambio'});
            return;
        }
        param.moneOriginal = param.moneOriginal.trim();
        param.cantidad = param.cantidad.trim();
        param.moneCambio = param.moneCambio.trim();
        if(param.cantidad.match(/^\d+\.{0,1}\d+$/g) == null){
            res.status(200).json({msn: 'El parametro es incorecto, los numeros deben ser escritos con un punto'});
            return;
        }
        let divisa = [
            'CAD:1.3256384622',
            'HKD:7.8401345088',
            'ISK:124.6932654731',
            'PHP:52.1294192493',
            'DKK:6.7855130419',
            'HUF:304.6169226575',
            'CZK:23.5135872035',
            'GBP:0.8011724075',
            'RON:4.3155503045',
            'SEK:9.7030809779',
            'IDR:14112.4965918386',
            'INR:70.9474688721',
            'BRL:4.1587748796',
            'RUB:63.6425520313',
            'HRK:6.7290738889',
            'JPY:107.6524584204',
            'THB:30.5643915296',
            'CHF:0.988639462',
            'EUR:0.9088430428',
            'MYR:4.1814959556',
            'BGN:1.7775152231',
            'TRY:5.6850858857',
            'CNY:7.1070617104',
            'NOK:9.0179950922',
            'NZD:1.583931655',
            'ZAR:14.868581296',
            'USD:1',
            'MXN:19.4398800327',
            'SGD:1.3764427883',
            'AUD:1.471326002',
            'ILS:3.5040443515',
            'KRW:1193.9107516132',
            'PLN:3.9819140234',
            'BO:6.96'
        ];
        //console.log(divisa);
        let valorOriginal = 0.0;
        let valorCambio = 0.0;
        for (let i = 0; i < divisa.length; i++) {
            let cadeDividida = divisa[i].split(':');
            //console.log(cadeDividida);
            if (param.moneOriginal == cadeDividida[0]) {
                 valorOriginal = parseFloat(cadeDividida[1]);
                 //console.log('La moneda original es '+cadeDividida[0]+' y su valor es '+valorOriginal);
            }
        }
        for (let i = 0; i < divisa.length; i++) {
            let cadeDividida = divisa[i].split(':');
            if (param.moneCambio == cadeDividida[0]) {
                valorCambio = parseFloat(cadeDividida[1]);
                //console.log('El tipo de moneda de cambio es '+cadeDividida[0]+' y su valor es '+valorCambio);
            }
        }
        let cantExactaDivisa=parseFloat(param.cantidad*(valorCambio/valorOriginal));
        let cadenaFinal = cantExactaDivisa +" "+ param.moneCambio;
        res.status(200).json({msn: cadenaFinal});
    }     
}
module.exports = ServicesController;
    