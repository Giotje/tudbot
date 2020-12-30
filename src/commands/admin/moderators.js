const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to know who is a moderator',
    use: `moderators`,
    process: (msg) => {

        msg.guild.members.fetch()
        .then( members => {

            let moderators = []
            members.each(GuildMember => {
                if ((GuildMember.roles.cache.some(r => data.moderator.includes("<@&" + r.id + ">")) || GuildMember.hasPermission('ADMINISTRATOR')) && !GuildMember.user.bot) {
                    moderators.push(GuildMember.user.id);
                }
            })
        
            let description = `Moderators are people who have access to more command than common mortal.
            If you want to allow someone to have access to moderator commands, s·he just need to have a moderator role. To manage moderators roles use \`${data.prefix}setmoderators\`. \n
            There ${moderators.length > 1 ? 'are' : 'is'} actually ${moderators.length} moderator${moderators.length > 1 ? 's' : ''} : \n`;
            moderators.forEach(item => {
                description += ` - <@${item}>\n`;
            });
    
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle('Moderators')
                .setDescription(description);
    
            msg.channel.send(embed);
        }).catch(() => {
            console.error("You need enable the option 'Server Members Intent' at 'https://discord.com/developers/applications'");
            msg.react('😞').catch(error => console.error(error));
        });
    }
};