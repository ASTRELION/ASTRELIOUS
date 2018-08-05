module.exports = {
  apps: [{
    name: 'ASTRELIOUS',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-202-62-143.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/astrelious-bot.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ASTRELION/ASTRELIOUS.git',
      path: '/home/ubuntu/astrelious',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
