const Discord = require('discord.js');
const client = new Discord.Client();
const { OpusEncoder } = require('@discordjs/opus');
const ytdl=require('discord-ytdl-core');
 var date = new Date(new Date().getTime()-(4*3600*1000)-57000); 
var year =  date.getUTCFullYear();    
 var month = date.getUTCMonth() ;
 var day = date.getUTCDate();
var hour= date.getUTCHours();


var minit = date.getUTCMinutes();
var second = date.getUTCSeconds();
var ans=year+'年'+month+'月'+day+'日'+hour+'时'+minit+'分'+second+'秒';
const filters=[
  'dynaudnorm=f=100',
  'bass=g=20,dynaudnorm=f=200',
  'apulsator=hz=0.08',
  'aresample=48000,asetrate=48000*1.25',
];

let choose=0;
let donec;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(ans);
  var cont="a1b";
  var min=cont.substring(
     cont.lastIndexOf("a")+1,
     cont.lastIndexOf("b")
     );
    
});


client.on('message', msg => {  
 let channel= client.channels.cache.get('you channel id');
  let voicechannel=client.channels.cache.get('your channel id');
 if(msg.content.substring(0,5)=="!text"){
   var cont=msg.content;
   var input=cont.substring(
     cont.lastIndexOf("<p>")+3,
     cont.lastIndexOf("</p>")
     );
    var inn=input.replace(/,/g,'\n');
  console.log(inn);
  channel.send(inn);
 }
 if(msg.content.substring(0,4)=="!luc"){
   var cont=msg.content;
   var min=cont.substring(
     cont.lastIndexOf("a")+1,
     cont.lastIndexOf("b")
     );
     
     var max=cont.substring(
     cont.lastIndexOf("c")+1,
     cont.lastIndexOf("d")
     );
      console.log(min);
      cont=getrandomint(min,max)
     msg.reply(cont);
 }
 if(msg.content.substring(0,3)=='!pf'){
   var str=msg.content.substring(3,msg.length);
  
   console.log(str);
   voicechannel.join().then(connection =>{
const dispatcher = connection.play(str);
dispatcher.on("end", end => {
  voicechannel.leave();
});
   }).catch(err => console.log(err));
   console.log(str);
 }
 if(msg.content.substring(0,3)=='!yt'){
    var str=msg.content.substring(3,msg.length);
     str=youtube_parser(str);
     console.log(str);
      donc=filters[choose];
       console.log(donc);
   let stream = ytdl(str, {
            quality: "highestaudio",
            highWaterMark:1<<25,
            opusEncoded: false,
            encoderArgs: ['-af', donc]
        });
     voicechannel.join().then(connection =>{
       msg.reply("start playing.");
let dispatcher = connection.play(stream,{
  type: "converted"
}).on("finish",()=>{
 voicechannel.leave();
 msg.reply('leave channel.')
})
});
 }
 switch(msg.content){
   case '垃圾bot':
   case 'bot垃圾':
   case 'fuck bot':
   case '狗bot':
     msg.reply('你敢骂我！！');
   break;
   case '早安':
     msg.reply('早上好');
     break;
   case 'morning':
   msg.reply('good morning!');
   break;
   case 'time':
      msg.reply(ans);
      break;
    case 'leave':
     voicechannel.leave();
     msg.reply('leave successful.');
     break;
    case 'pause':
   // voicechannel.dispatcher.pause(true);
    break;
    case 'resume':
  //  voicechannel.dispatcher.resume();
    break;
 }
if(msg.content.substring(0,6)=='filter'){
  let coi=msg.content.substring(7,msg.length);
 
  choose=coi-1;
  console.log(choose);
}
});
function youtube_parser(url){ 
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
   var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false; 
    }
function getrandomint(min,max){
  var we;
  min=Math.ceil(min);
  max=Math.floor(max);
  we=Math.floor(Math.random()*(max-min+1))+min;
  return we;
}
client.login('your token id');
