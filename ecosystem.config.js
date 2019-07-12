module.exports = {
  apps : [{
    name: 'Search-Banner',
    script: './server/index.js'

    // // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    // instances: 1,
    // autorestart: true,
    // watch: false,
    // max_memory_restart: '1G',
    // env: {
    //   NODE_ENV: 'development'
    // },
    // env_production: {
    //   NODE_ENV: 'production'
    // }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : 'ec2-3-84-24-46.compute-1.amazonaws.com',
      key  : '~/.ssh/FEC.pem',
      ref  : 'origin/departments-feature',
      repo : 'git@github.com:mc-ed/Search-Banner.git',
      path : '/home/ubuntu/Search-Banner',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
