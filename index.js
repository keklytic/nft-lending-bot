//https://discord.com/api/oauth2/authorize?client_id=1139824610704105533&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D1139824610704105533&response_type=code&scope=identify%20email%20connections%20guilds.join%20guilds

import { Client, GatewayIntentBits, EmbedBuilder, messageLink  } from 'discord.js'
import dotenv from 'dotenv';
import axios from 'axios';
import { GuildManager } from 'discord.js';


dotenv.config()

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});


function convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}

        var eth_block = []
        var op_block = []
        var arb_block = []
        var avax_block = []
        var pol_block = []
        var bsc_block = []
        var base_block = []

        var aa_eth_today
        var aa_eth_ytd
        var aa_op_today
        var aa_op_ytd
        var aa_arb_today
        var aa_arb_ytd
        var aa_pol_today
        var aa_pol_ytd
        var aa_avax_today
        var aa_avax_ytd
        var aa_bsc_today
        var aa_bsc_ytd
        var aa_base_today
        var aa_base_ytd

        var userop_eth_today = 0
        var userop_eth_ytd = 0
        var userop_op_today = 0
        var userop_op_ytd = 0
        var userop_arb_today = 0
        var userop_arb_ytd = 0
        var userop_pol_today = 0
        var userop_pol_ytd = 0
        var userop_avax_today = 0
        var userop_avax_ytd = 0
        var userop_bsc_today = 0
        var userop_bsc_ytd = 0
        var userop_base_today = 0
        var userop_base_ytd = 0

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'Authorization': 'Basic ' + Buffer.from(process.env.COVALENT_API_KEY + ':').toString('base64')
            }
            }

            function number_test(n)
                {
                var result = (n - Math.floor(n)) !== 0; 
                
                if (result)
                    return false; // has decimal
                else
                    return true; // whole number
                }

async function getBlock() {

    await axios.get("https://api.flipsidecrypto.com/api/v2/queries/6f9fcce0-64df-483c-8851-7fcdb96bb7f4/data/latest").then(res => {
    if(res){
        for (var i = 0; i < res.data.length; i ++){
            eth_block.push(res.data[i].ETH_BLOCK)
            op_block.push(res.data[i].OPTIMISM_BLOCK)
            arb_block.push(res.data[i].ARBITRUM_BLOCK)
            pol_block.push(res.data[i].POLYGON_BLOCK)
            avax_block.push(res.data[i].AVALANCHE_BLOCK)
            bsc_block.push(res.data[i].BSC_BLOCK)
            base_block.push(res.data[i].BASE_BLOCK)

        }
    }
    console.log(eth_block)

})
}

async function getCreation() {

    await getBlock()
        // eth
    await axios.get(`https://api.covalenthq.com/v1/eth-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${eth_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
        aa_eth_today = res.data.data.items.length
        })


        await axios.get(`https://api.covalenthq.com/v1/eth-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${eth_block[6]}&ending-block=${eth_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_eth_ytd = res.data.data.items.length
        
        })

        // optimism
        await axios.get(`https://api.covalenthq.com/v1/optimism-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${op_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_op_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/optimism-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${op_block[6]}&ending-block=${op_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_op_ytd = res.data.data.items.length
        
        })

        // arbitrum
        await axios.get(`https://api.covalenthq.com/v1/arbitrum-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${arb_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_arb_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/arbitrum-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${arb_block[6]}&ending-block=${arb_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_arb_ytd = res.data.data.items.length
        
        })

        // polygon
        await axios.get(`https://api.covalenthq.com/v1/matic-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${pol_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_pol_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/matic-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${pol_block[6]}&ending-block=${pol_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_pol_ytd = res.data.data.items.length
        
        })

        // avax
        await axios.get(`https://api.covalenthq.com/v1/avalanche-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${avax_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_avax_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/avalanche-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${avax_block[6]}&ending-block=${avax_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_avax_ytd = res.data.data.items.length
        
        })

        // bsc
        await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${bsc_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_bsc_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${bsc_block[6]}&ending-block=${bsc_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_bsc_ytd = res.data.data.items.length
        
        })

        // base
        await axios.get(`https://api.covalenthq.com/v1/base-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${base_block[7]}&ending-block=latest&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_base_today = res.data.data.items.length
        
        })

        await axios.get(`https://api.covalenthq.com/v1/base-mainnet/events/topics/0xd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d/?starting-block=${base_block[6]}&ending-block=${base_block[7]}&page-size=100000`, options).then(res => {
            // If we got a valid response
        aa_base_ytd = res.data.data.items.length
        
        })
}

async function getCreationCount(){

    await getCreation()

               
        const embed = new EmbedBuilder()
        .setTitle(`Smart Account Tracking Bot`)
        .setAuthor({ name: 'DAATA And AI Hackathon', iconURL: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', url:'https://twitter.com/ahkek4'})
        .setImage('https://thewealthmastery.io/wp-content/uploads/2023/04/Account-Abstraction-1024x536.jpg')
        .setDescription(`24 hours Smart Account Created By Chain:

        Today AA created on Ethereum - ${aa_eth_today} (${((aa_eth_today - aa_eth_ytd) * 100/ aa_eth_ytd).toFixed(2)}%)
        Today AA created on Optimism - ${aa_op_today} (${((aa_op_today - aa_op_ytd) * 100/ aa_op_ytd).toFixed(2)}%)
        Today AA created on Arbitrum - ${aa_arb_today} (${((aa_arb_today - aa_arb_ytd) * 100/ aa_arb_ytd).toFixed(2)}%)
        Today AA created on Polygon - ${aa_pol_today} (${((aa_pol_today - aa_pol_ytd) * 100/ aa_pol_ytd).toFixed(2)}%)
        Today AA created on Avalanche - ${aa_avax_today} (${((aa_avax_today - aa_avax_ytd) * 100/ aa_avax_ytd).toFixed(2)}%)
        Today AA created on BNB Chain - ${aa_bsc_today} (${((aa_bsc_today - aa_bsc_ytd) * 100/ aa_bsc_ytd).toFixed(2)}%)
        Today AA created on Base - ${aa_base_today} (${((aa_base_today - aa_base_ytd) * 100/ aa_base_ytd).toFixed(2)}%)

    `)
        .setColor('Random')
        .setFooter({ text: 'Powered by Covalent', iconURL: 'https://cryptologos.cc/logos/covalent-cqt-logo.png', url:'https://www.covalenthq.com/' });


        client.channels.fetch('832632673155285055')
        .then(channel => {
        channel.send({embeds: [embed]});
        })

        client.channels.fetch('1163083303465795597')
        .then(channel => {
        channel.send({embeds: [embed]});
        })
         // need add bot first before can send message

        // client.guilds.cache.get('832632673155285055').channels.cache.get('832632673155285055').send({embeds: [embed2]});

}

async function getUserOp(){

    await getBlock()

    // eth
    var uop_eth_today = 0
    while (number_test(userop_eth_today/ 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/eth-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${eth_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_eth_today}`, options).then(res => {
        // If we got a valid response
        userop_eth_today+=res.data.data.items.length
    })
        uop_eth_today ++
        if (userop_eth_today == 0) {
            break;
        }
    }


    var uop_eth_ytd = 0
    while (number_test(userop_eth_ytd / 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/eth-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${eth_block[6]}&ending-block=${eth_block[7]}&page-size=10000&page-number=${uop_eth_ytd}`, options).then(res => {
        // If we got a valid response
        userop_eth_ytd += res.data.data.items.length
    })
        uop_eth_ytd ++
        if (userop_eth_ytd == 0) {
            break;
        }
    }

    // optimism
    var uop_op_today = 0
    while (number_test(userop_op_today / 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/optimism-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${op_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_op_today}`, options).then(res => {
        // If we got a valid response
        userop_op_today += res.data.data.items.length
    
    })
        uop_op_today++
        if (userop_op_today == 0) {
            break;
        }
    }
    


    var uop_op_ytd = 0
    while (number_test(userop_op_ytd / 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/optimism-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${op_block[6]}&ending-block=${op_block[7]}&page-size=10000&page-number=${uop_op_ytd}`, options).then(res => {
        // If we got a valid response
        userop_op_ytd += res.data.data.items.length
    
    })
        uop_op_ytd++
        if (userop_op_ytd == 0) {
            break;
        }
    }

    // arbitrum
    var uop_arb_today = 0
    while (number_test(userop_arb_today / 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/arbitrum-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${arb_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_arb_today}`, options).then(res => {
        // If we got a valid response
        userop_arb_today += res.data.data.items.length
        
    })
        uop_arb_today++
        if (userop_arb_today == 0) {
            break;
        }
    }


    var uop_arb_ytd = 0
    while (number_test(userop_arb_ytd / 10000) == true){ 
    await axios.get(`https://api.covalenthq.com/v1/arbitrum-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${arb_block[6]}&ending-block=${arb_block[7]}&page-size=10000&page-number=${uop_arb_ytd}`, options).then(res => {
        // If we got a valid response
        userop_arb_ytd += res.data.data.items.length
    
    })
        uop_arb_ytd++
        if (userop_arb_ytd == 0) {
            break;
        }
    }

    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(1000);

    // polygon


    var pol_today = 0
    while (userop_pol_today % 10000 == 0){
        await axios.get(`https://api.covalenthq.com/v1/matic-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${pol_block[7]}&ending-block=latest&page-size=10000&page-number=${pol_today}`, options).then(res => {
        userop_pol_today+=res.data.data.items.length
    })
        pol_today++
    }
    
    var pol_ytd = 0
    while (userop_pol_ytd % 10000 == 0){
        await axios.get(`https://api.covalenthq.com/v1/matic-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${pol_block[6]}&ending-block=${pol_block[7]}&page-size=10000&page-number=${pol_ytd}`, options).then(res => {
        userop_pol_ytd+=res.data.data.items.length
    })
        pol_ytd++
    }
    

    // avax
    var uop_avax_today = 0
    while (userop_avax_today % 10000 == 0){ 
    await axios.get(`https://api.covalenthq.com/v1/avalanche-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${avax_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_avax_today}`, options).then(res => {
        // If we got a valid response
        userop_avax_today += res.data.data.items.length
    
    })
        uop_avax_today++
        if (userop_avax_today == 0) {
            break;
        }
    }

    var uop_avax_ytd = 0
    while (userop_avax_ytd % 10000 == 0){ 
    await axios.get(`https://api.covalenthq.com/v1/avalanche-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${avax_block[6]}&ending-block=${avax_block[7]}&page-size=10000&page-number=${uop_avax_ytd}`, options).then(res => {
        // If we got a valid response
        userop_avax_ytd += res.data.data.items.length
    
    })
        uop_avax_ytd++
        if (userop_avax_ytd == 0) {
            break;
        }
    }
    console.log(userop_avax_ytd)

    // bsc
    var uop_bsc_today = 0
    while (userop_bsc_today % 10000 == 0){
    await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${bsc_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_bsc_today}`, options).then(res => {
        // If we got a valid response
        userop_bsc_today += res.data.data.items.length
    
    })
        uop_bsc_today++
        if (userop_bsc_today == 0) {
            break;
        }
    }

    var uop_bsc_ytd = 0
    while (userop_bsc_ytd % 10000 == 0){
    await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${bsc_block[6]}&ending-block=${bsc_block[7]}&page-size=10000&page-number=${uop_bsc_ytd}`, options).then(res => {
        // If we got a valid response
        userop_bsc_ytd += res.data.data.items.length
    
    })
        uop_bsc_ytd++
        if (userop_bsc_ytd == 0) {
            break;
        }
    }

    // base
    var uop_base_today = 0
    while (userop_base_today % 10000 == 0){
    await axios.get(`https://api.covalenthq.com/v1/base-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${base_block[7]}&ending-block=latest&page-size=10000&page-number=${uop_base_today}`, options).then(res => {
        // If we got a valid response
        userop_base_today += res.data.data.items.length
    
    })
        uop_base_today++
        if (userop_base_today == 0) {
            break;
        }
    }

    var uop_base_ytd = 0
    while (userop_base_ytd % 10000 == 0){
    await axios.get(`https://api.covalenthq.com/v1/base-mainnet/events/topics/0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f/?starting-block=${base_block[6]}&ending-block=${base_block[7]}&page-size=10000&page-number=${uop_base_ytd}`, options).then(res => {
        // If we got a valid response
        userop_base_ytd += res.data.data.items.length
    
    })
        uop_base_ytd++
        if (userop_base_ytd == 0) {
            break;
        }
    }
}
          
            
    



async function getUserOpCount(){

    await getUserOp()

    const embed = new EmbedBuilder()
        .setTitle(`Smart Account Tracking Bot`)
        .setAuthor({ name: 'DAATA And AI Hackathon', iconURL: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', url:'https://twitter.com/ahkek4'})
        .setImage('https://public.bnbstatic.com/static/academy/uploads/be47a349fab54855b99152416ab172f1.png')
        .setDescription(`24 hours Smart Account UserOP By Chain:

        Today User Operation Count on Ethereum - ${userop_eth_today} (${((userop_eth_today - userop_eth_ytd) * 100/ userop_eth_ytd).toFixed(2)}%)
        Today User Operation Count on Optimism - ${userop_op_today} (${((userop_op_today - userop_op_ytd) * 100/ userop_op_ytd).toFixed(2)}%)
        Today User Operation Count on Arbitrum - ${userop_arb_today} (${((userop_arb_today - userop_arb_ytd) * 100/ userop_arb_ytd).toFixed(2)}%)
        Today User Operation Count on Polygon - ${userop_pol_today} (${((userop_pol_today - userop_pol_ytd) * 100/ userop_pol_ytd).toFixed(2)}%)
        Today User Operation Count on Avalanche - ${userop_avax_today} (${((userop_avax_today - userop_avax_ytd) * 100/ userop_avax_ytd).toFixed(2)}%)
        Today User Operation Count on BNB Chain - ${userop_bsc_today} (${((userop_bsc_today - userop_bsc_ytd) * 100/ userop_bsc_ytd).toFixed(2)}%)
        Today User Operation Count on Base - ${userop_base_today} (${((userop_base_today - userop_base_ytd) * 100/ userop_base_ytd).toFixed(2)}%)

    `)
        .setColor('Random')
        .setFooter({ text: 'Powered by Covalent', iconURL: 'https://cryptologos.cc/logos/covalent-cqt-logo.png', url:'https://www.covalenthq.com/' });


        client.channels.fetch('832632673155285055')
        .then(channel => {
        channel.send({embeds: [embed]});
        })

        client.channels.fetch('1163083303465795597')
        .then(channel => {
        channel.send({embeds: [embed]});
        })
}

client.on("ready", () => {

    console.log(`${client.user.tag} is ready!`)


    // const guildId = '1139941056994091029'
    // const guild = client.guilds.cache.get(guildId) 

    // guild.members.cache.get(client.user.id).setNickname('damn')
    // console.log(guild.members.cache.get(client.user.id).nickname)
    
    // let commands;

    // if(guild){
    //     commands = guild.commands;
    // } else {
    //     commands = client.application?.commands
    // }

    // commands.create({
    //     name: 'deposit',
    //     description: "Tell us how many have being deposited as collateral"
    // })

    // commands.create({
    //     name: 'liquidate',
    //     description: "Tell us how many NFT have being liquidated"
    // })
    getCreationCount() // Ping server once on startup
    getUserOpCount() // Ping server once on startup

	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
	setInterval(getCreationCount, Math.max(1, process.env.MC_PING_FREQUENCY) * 60 * 1000)
    setInterval(getUserOpCount, Math.max(1, process.env.MC_PING_FREQUENCY) * 60 * 1000)


});;


client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

  
    const { commandName } = interaction;

   
            
    // }
})

client.login(process.env.BOT_TOKEN);
