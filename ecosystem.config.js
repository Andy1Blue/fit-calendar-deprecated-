module.exports = {
  apps: [{
    name: 'FitCalendar server',
    script: 'npm',
    args: 'run start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    error_file: './.logs/pm2/err.log',
    out_file: './.logs/pm2/out.log',
    log_file: './.logs/pm2/combined.log',
    time: true,
  }],
};
