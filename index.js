 <script>
        const URL = 'https://teachablemachine.withgoogle.com/models/sX5vereWJ/';
        const items = getFashion();
        items.then( function(result){
            showFashion(result);
        });
    
        function showFashion(items){
            let output = document.getElementById('prediction');
            for(i=0; i<items.length; i++){
                let img = items[i].nodes;

                let bag = items[i].prediction[0].probability;
                let belt = items[i].prediction[1].probability;
                let bottomwear = items[i].prediction[2].probability;
                let cufflinks = items[i].prediction[3].probability;
                let dress = items[i].prediction[4].probability;
                let eyewear = items[i].prediction[5].probability;
                let flipflop = items[i].prediction[6].probability;
                let fragrance = items[i].prediction[7].probability;
                let jewellery = items[i].prediction[8].probability;
                let watches = items[i].prediction[9].probability;

                let hold;
                if(bag >= 0.99){
                    hold = 'Bag';
                }else if(belt >= 0.99){
                    hold = 'Belt';
                }else if(bottomwear >= 0.99){
                    hold = 'Bottomewear';
                }else if(cufflinks >= 0.99){
                    hold = 'Cufflinks';
                }else if(dress >= 0.99){
                    hold = 'Dress';
                }else if(eyewear >= 0.99){
                    hold = 'Eyewear';
                }else if(flipflop >= 0.99){
                    hold = 'Flipflops';
                }else if(fragrance >= 0.99){
                    hold = 'Fragrance';
                }else if(jewellery >= 0.99){
                    hold = 'Jewellery';
                }else if(watches >= 0.99){
                    hold = 'Watches';
                }else{
                    console.log("I Can't See What is that item!");
                }
                let p = document.createElement('p');

                let outp ="<br>" + hold + "<br>";

                p.innerHTML = outp;
                p.appendChild(img);
                output.appendChild(p);
            }
        }
    
    
        async function getFashion() {
            let nodes = document.getElementById('fashion').childNodes;
            let items = [];
            let model, prediction;
    
            const modelURL = URL + 'model.json';
            const metadataURL = URL + 'metadata.json';
    
            model = await tmImage.load(modelURL, metadataURL);
            for(i=0; i<nodes.length; i++){
                if(nodes[i].nodeName.toLowerCase() == 'img'){
                    prediction = await model.predict(nodes[i]);
                    let item = {};
                    item["nodes"] = nodes[i];
                    item["prediction"] = prediction;
                    items.push(item);
                }
            }
            return items;
        }
    </script>
