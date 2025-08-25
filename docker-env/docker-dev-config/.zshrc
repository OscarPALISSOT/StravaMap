# Oh My Zsh
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

# Plugins
plugins=(
  git
  npm
  docker
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# Charger Powerlevel10k si config présente
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# NPM global path
export PATH=$HOME/.npm-global/bin:$PATH

# Aliases pratiques
alias ll='ls -lah --color=auto'
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git pull'
alias dps='docker ps'
alias di='docker images'
alias dcup='docker-compose up -d'
alias dcd='docker-compose down'
