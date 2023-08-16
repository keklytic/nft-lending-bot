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


function getPrices() {

    const guildId = '1139941056994091029'
    const guild = client.guilds.cache.get(guildId)
	// API for price data.
	axios.get(`https://api.dune.com/api/v1/query/2847738/results?api_key=${process.env.API_KEY}`).then(res => {
		// If we got a valid response
		if(res.data ) {
			let loan_today = res.data.result.rows[0].total_borrow_usd

            let loan_today1 = res.data.result.rows[0].platform.concat(' - ').concat(convertToInternationalCurrencySystem(res.data.result.rows[0].borrow_volume_usd))
            let loan_today2 = res.data.result.rows[1].platform.concat(' - ').concat(convertToInternationalCurrencySystem(res.data.result.rows[1].borrow_volume_usd))
            let loan_today3 = res.data.result.rows[2].platform.concat(' - ').concat(convertToInternationalCurrencySystem(res.data.result.rows[2].borrow_volume_usd))
            let loan_today4 = res.data.result.rows[3].platform.concat(' - ').concat(res.data.result.rows[3].borrow_volume_usd)
            let loan_today5 = res.data.result.rows[4].platform.concat(' - ').concat(res.data.result.rows[4].borrow_volume_usd)

			// let currentPrice = [res.data.result.rows[0].collection.concat('-').concat(res.data.result.rows[0].nft_deposit),
			// res.data.result.rows[1].collection.concat('-').concat(res.data.result.rows[1].nft_deposit),
			// res.data.result.rows[2].collection.concat('-').concat(res.data.result.rows[2].nft_deposit)]
			// Default to zero
			// let priceChange = res.data.result.rows[0].total_borrow_usd - res.data.result.rows[1].total_borrow_usd || 0 // Default to zero
            // client.user.setPresence({ activities: [{ name: `${convertToInternationalCurrencySystem(loan_today)} | Loan 24hrs` }], status: 'online' });


            client.user.setPresence({ activities: [{ name: `NFT bot | Loan 24hrs` }], status: 'online' });

            guild.members.cache.get(client.user.id).setNickname(`Total Loan: ${convertToInternationalCurrencySystem(loan_today).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}${process.env.CURRENCY_SYMBOL}`)

            // client.GuildMember.Nickname(`${(loan_today).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}${process.env.CURRENCY_SYMBOL}`)

			console.log('Updated price to', loan_today)

            const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Today Loan Volume - ${(loan_today).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}${process.env.CURRENCY_SYMBOL}`)
            .setImage('https://media.discordapp.net/attachments/1006769849181163563/1140495521195241512/nft_lending.png?width=1067&height=600')
            .setDescription(`Top 3 Loan Volume By Platform:
            ${loan_today1}
            ${loan_today2}
            ${loan_today3}
           
            
        `)
            
            client.channels.fetch('1140496119789527120')
            .then(channel => {
            channel.send({embeds: [embed]});
            })

              // need add bot first before can send message

              client.guilds.cache.get('832632673155285052').channels.cache.get('832632673155285055').send({embeds: [embed]});


            

            

    //         client.channels.fetch('1140496119789527120')
    //         .then(channel => {
    //         channel.send(`Loan Today - ${(loan_today).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}${process.env.CURRENCY_SYMBOL}`);
    // })
		}
		else
			console.log('Could not load count data for', process.env.COIN_ID)

	}).catch(err => console.log('Error at dune.com data:', err))


    axios.get(`https://api.dune.com/api/v1/query/2725441/results?api_key=${process.env.API_KEY}`).then(res => {
            // If we got a valid response
           
           
            if(res.data ) {
                let currentPrice0 = res.data.result.rows[0].collection.concat(' - ').concat(res.data.result.rows[0].nft_deposit)
                let currentPrice1 = res.data.result.rows[1].collection.concat(' - ').concat(res.data.result.rows[1].nft_deposit)
                let currentPrice2 = res.data.result.rows[2].collection.concat(' - ').concat(res.data.result.rows[2].nft_deposit)
                let currentPrice3 = res.data.result.rows[3].collection.concat(' - ').concat(res.data.result.rows[3].nft_deposit)
                let currentPrice4 = res.data.result.rows[4].collection.concat(' - ').concat(res.data.result.rows[4].nft_deposit)
                let currentPrice5 = res.data.result.rows[5].collection.concat(' - ').concat(res.data.result.rows[5].nft_deposit)
                let currentPrice6 = res.data.result.rows[6].collection.concat(' - ').concat(res.data.result.rows[6].nft_deposit)
                let currentPrice7 = res.data.result.rows[7].collection.concat(' - ').concat(res.data.result.rows[7].nft_deposit)
                let currentPrice8 = res.data.result.rows[8].collection.concat(' - ').concat(res.data.result.rows[8].nft_deposit)
                let currentPrice9 = res.data.result.rows[9].collection.concat(' - ').concat(res.data.result.rows[9].nft_deposit)
                let currentPrice10 = res.data.result.rows[10].collection.concat(' - ').concat(res.data.result.rows[10].nft_deposit)
            
                let this_week_deposit = res.data.result.rows[0].nft_deposit + res.data.result.rows[1].nft_deposit
                + res.data.result.rows[2].nft_deposit + res.data.result.rows[3].nft_deposit + res.data.result.rows[4].nft_deposit 
                + res.data.result.rows[5].nft_deposit + res.data.result.rows[6].nft_deposit + res.data.result.rows[7].nft_deposit 
                + res.data.result.rows[8].nft_deposit + res.data.result.rows[9].nft_deposit + res.data.result.rows[10].nft_deposit

                // interaction.reply({
                    
                //     content: `This week top collection deposit:
                //      ${currentPrice0}
                //      ${currentPrice1}
                //      ${currentPrice2}
                //      ${currentPrice3}
                //      ${currentPrice4}
                //      ${currentPrice5}
                //      ${currentPrice6}
                //      ${currentPrice7}
                //      ${currentPrice8}
                //      ${currentPrice9}
                //      ${currentPrice10}

                //      `
                // })
                const embed2 = new EmbedBuilder()
                .setTitle(`Last 7 days Top Deposit - ${this_week_deposit}`)
                .setImage('https://media.discordapp.net/attachments/1006769849181163563/1140830180265435229/F3bE3ovbcAAJQJx.png?width=600&height=600')
                .setDescription(`This week top collection deposit:
                ${currentPrice0}
                ${currentPrice1}
                ${currentPrice2}
                ${currentPrice3}
                ${currentPrice4}
                ${currentPrice5}
                ${currentPrice6}
                ${currentPrice7}
                ${currentPrice8}
                ${currentPrice9}
                ${currentPrice10}
            `)
                .setColor('Random')
                

                client.channels.fetch('1140496119789527120')
                .then(channel => {
                channel.send({embeds: [embed2]});
                })

                 // need add bot first before can send message

                client.guilds.cache.get('832632673155285052').channels.cache.get('832632673155285055').send({embeds: [embed2]});

    
                
            }})

    // console.log(guild.members.cache.get(client.user.id))


    axios.get(`https://api.dune.com/api/v1/query/2723498/results?api_key=${process.env.API_KEY}`).then(res => {
            // If we got a valid response
            if(res.data ) {
                let currentPrice0 = res.data.result.rows[0].name.concat(' - ').concat(res.data.result.rows[0].total_nft_liquidate)
                let currentPrice1 = res.data.result.rows[1].name.concat(' - ').concat(res.data.result.rows[1].total_nft_liquidate)
                let currentPrice2 = res.data.result.rows[2].name.concat(' - ').concat(res.data.result.rows[2].total_nft_liquidate)
                let currentPrice3 = res.data.result.rows[3].name.concat(' - ').concat(res.data.result.rows[3].total_nft_liquidate)
                let currentPrice4 = res.data.result.rows[4].name.concat(' - ').concat(res.data.result.rows[4].total_nft_liquidate)
                let currentPrice5 = res.data.result.rows[5].name.concat(' - ').concat(res.data.result.rows[5].total_nft_liquidate)
                let currentPrice6 = res.data.result.rows[6].name.concat(' - ').concat(res.data.result.rows[6].total_nft_liquidate)
                let currentPrice7 = res.data.result.rows[7].name.concat(' - ').concat(res.data.result.rows[7].total_nft_liquidate)
                let currentPrice8 = res.data.result.rows[8].name.concat(' - ').concat(res.data.result.rows[8].total_nft_liquidate)
                let currentPrice9 = res.data.result.rows[9].name.concat(' - ').concat(res.data.result.rows[9].total_nft_liquidate)
                let currentPrice10 = res.data.result.rows[10].name.concat(' - ').concat(res.data.result.rows[10].total_nft_liquidate)
            
                let this_week_liquidate = res.data.result.rows[0].total_nft_liquidate + res.data.result.rows[1].total_nft_liquidate
                + res.data.result.rows[2].total_nft_liquidate + res.data.result.rows[3].total_nft_liquidate + res.data.result.rows[4].total_nft_liquidate 
                + res.data.result.rows[5].total_nft_liquidate + res.data.result.rows[6].total_nft_liquidate + res.data.result.rows[7].total_nft_liquidate 
                + res.data.result.rows[8].total_nft_liquidate + res.data.result.rows[9].total_nft_liquidate + res.data.result.rows[10].total_nft_liquidate


                // interaction.reply({
                //     content: `This week top collection liquidated:
                //      ${currentPrice0}
                //      ${currentPrice1}
                //      ${currentPrice2}
                //      ${currentPrice3}
                //      ${currentPrice4}
                //      ${currentPrice5}
                //      ${currentPrice6}
                //      ${currentPrice7}
                //      ${currentPrice8}
                //      ${currentPrice9}
                //      ${currentPrice10}

                //      `
                // })

                const embed3 = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Last 7 days Total Liquidate - ${this_week_liquidate}`)
                .setImage('https://media.discordapp.net/attachments/1006769849181163563/1140830180265435229/F3bE3ovbcAAJQJx.png?width=600&height=600')
                .setDescription(`This week top collection liquidated:
                ${currentPrice0}
                ${currentPrice1}
                ${currentPrice2}
                ${currentPrice3}
                ${currentPrice4}
                ${currentPrice5}
                ${currentPrice6}
                ${currentPrice7}
                ${currentPrice8}
                ${currentPrice9}
                ${currentPrice10}
            `)
                
            client.channels.fetch('1140496119789527120')
            .then(channel => {
            channel.send({embeds: [embed3]});
            })

            // need add bot first before can send message

            client.guilds.cache.get('832632673155285052').channels.cache.get('832632673155285055').send({embeds: [embed3]});

            
            }})
          
            
    

}

client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)


    const guildId = '1139941056994091029'
    const guild = client.guilds.cache.get(guildId) 

    // guild.members.cache.get(client.user.id).setNickname('damn')
    // console.log(guild.members.cache.get(client.user.id).nickname)
    
    let commands;

    if(guild){
        commands = guild.commands;
    } else {
        commands = client.application?.commands
    }

    // commands.create({
    //     name: 'deposit',
    //     description: "Tell us how many have being deposited as collateral"
    // })

    // commands.create({
    //     name: 'liquidate',
    //     description: "Tell us how many NFT have being liquidated"
    // })

    getPrices() // Ping server once on startup
	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
	setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY) * 60 * 1000)
    

});;


client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

  
    const { commandName } = interaction;

    // if(commandName === 'deposit' ){
    //     axios.get(`https://api.dune.com/api/v1/query/2725441/results?api_key=${process.env.API_KEY}`).then(res => {
    //         // If we got a valid response
           
           
    //         if(res.data ) {
    //             let currentPrice0 = res.data.result.rows[0].collection.concat(' - ').concat(res.data.result.rows[0].nft_deposit)
    //             let currentPrice1 = res.data.result.rows[1].collection.concat(' - ').concat(res.data.result.rows[1].nft_deposit)
    //             let currentPrice2 = res.data.result.rows[2].collection.concat(' - ').concat(res.data.result.rows[2].nft_deposit)
    //             let currentPrice3 = res.data.result.rows[3].collection.concat(' - ').concat(res.data.result.rows[3].nft_deposit)
    //             let currentPrice4 = res.data.result.rows[4].collection.concat(' - ').concat(res.data.result.rows[4].nft_deposit)
    //             let currentPrice5 = res.data.result.rows[5].collection.concat(' - ').concat(res.data.result.rows[5].nft_deposit)
    //             let currentPrice6 = res.data.result.rows[6].collection.concat(' - ').concat(res.data.result.rows[6].nft_deposit)
    //             let currentPrice7 = res.data.result.rows[7].collection.concat(' - ').concat(res.data.result.rows[7].nft_deposit)
    //             let currentPrice8 = res.data.result.rows[8].collection.concat(' - ').concat(res.data.result.rows[8].nft_deposit)
    //             let currentPrice9 = res.data.result.rows[9].collection.concat(' - ').concat(res.data.result.rows[9].nft_deposit)
    //             let currentPrice10 = res.data.result.rows[10].collection.concat(' - ').concat(res.data.result.rows[10].nft_deposit)
            
    //             // interaction.reply({
                    
    //             //     content: `This week top collection deposit:
    //             //      ${currentPrice0}
    //             //      ${currentPrice1}
    //             //      ${currentPrice2}
    //             //      ${currentPrice3}
    //             //      ${currentPrice4}
    //             //      ${currentPrice5}
    //             //      ${currentPrice6}
    //             //      ${currentPrice7}
    //             //      ${currentPrice8}
    //             //      ${currentPrice9}
    //             //      ${currentPrice10}

    //             //      `
    //             // })
    //             const embed = new EmbedBuilder()
    //             .setTitle('Top Deposit')
    //             .setImage('https://media.discordapp.net/attachments/1006769849181163563/1140495521195241512/nft_lending.png?width=1067&height=600')
    //             .setDescription(`This week top collection deposit:
    //             ${currentPrice0}
    //             ${currentPrice1}
    //             ${currentPrice2}
    //             ${currentPrice3}
    //             ${currentPrice4}
    //             ${currentPrice5}
    //             ${currentPrice6}
    //             ${currentPrice7}
    //             ${currentPrice8}
    //             ${currentPrice9}
    //             ${currentPrice10}
    //         `)
    //             .setColor('Random')
                

    //             interaction.reply({embeds: [embed]})

    //         }})

           
    // }

    // if(commandName === 'liquidate' ){
    //     axios.get(`https://api.dune.com/api/v1/query/2723498/results?api_key=${process.env.API_KEY}`).then(res => {
    //         // If we got a valid response
    //         if(res.data ) {
    //             let currentPrice0 = res.data.result.rows[0].name.concat(' - ').concat(res.data.result.rows[0].total_nft_liquidate)
    //             let currentPrice1 = res.data.result.rows[1].name.concat(' - ').concat(res.data.result.rows[1].total_nft_liquidate)
    //             let currentPrice2 = res.data.result.rows[2].name.concat(' - ').concat(res.data.result.rows[2].total_nft_liquidate)
    //             let currentPrice3 = res.data.result.rows[3].name.concat(' - ').concat(res.data.result.rows[3].total_nft_liquidate)
    //             let currentPrice4 = res.data.result.rows[4].name.concat(' - ').concat(res.data.result.rows[4].total_nft_liquidate)
    //             let currentPrice5 = res.data.result.rows[5].name.concat(' - ').concat(res.data.result.rows[5].total_nft_liquidate)
    //             let currentPrice6 = res.data.result.rows[6].name.concat(' - ').concat(res.data.result.rows[6].total_nft_liquidate)
    //             let currentPrice7 = res.data.result.rows[7].name.concat(' - ').concat(res.data.result.rows[7].total_nft_liquidate)
    //             let currentPrice8 = res.data.result.rows[8].name.concat(' - ').concat(res.data.result.rows[8].total_nft_liquidate)
    //             let currentPrice9 = res.data.result.rows[9].name.concat(' - ').concat(res.data.result.rows[9].total_nft_liquidate)
    //             let currentPrice10 = res.data.result.rows[10].name.concat(' - ').concat(res.data.result.rows[10].total_nft_liquidate)
            
    //             // interaction.reply({
    //             //     content: `This week top collection liquidated:
    //             //      ${currentPrice0}
    //             //      ${currentPrice1}
    //             //      ${currentPrice2}
    //             //      ${currentPrice3}
    //             //      ${currentPrice4}
    //             //      ${currentPrice5}
    //             //      ${currentPrice6}
    //             //      ${currentPrice7}
    //             //      ${currentPrice8}
    //             //      ${currentPrice9}
    //             //      ${currentPrice10}

    //             //      `
    //             // })

    //             const embed = new EmbedBuilder()
    //             .setTitle('Top Liquidate')
    //             .setImage('https://media.discordapp.net/attachments/1006769849181163563/1140495521195241512/nft_lending.png?width=1067&height=600')
    //             .setDescription(`This week top collection liquidated:
    //             ${currentPrice0}
    //             ${currentPrice1}
    //             ${currentPrice2}
    //             ${currentPrice3}
    //             ${currentPrice4}
    //             ${currentPrice5}
    //             ${currentPrice6}
    //             ${currentPrice7}
    //             ${currentPrice8}
    //             ${currentPrice9}
    //             ${currentPrice10}
    //         `)
    //             .setColor('Random')
                

    //             interaction.reply({embeds: [embed]})
    //         }})

            
    // }
})

client.login(process.env.BOT_TOKEN);