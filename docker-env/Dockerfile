FROM node:24.6.0-alpine3.22

# Install dev tools + zsh + fonts (pour powerlevel10k)
RUN apk update && apk add --no-cache \
    git curl wget unzip zip vim nano htop build-base bash sudo zsh fontconfig ttf-dejavu \
    && rm -rf /var/cache/apk/*

# Create non-root dev user
RUN adduser -D -s /bin/bash developer \
    && echo "developer ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Switch to developer user
USER developer
WORKDIR /home/developer/WKS

# Install Oh My Zsh unattended
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install Powerlevel10k theme
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $HOME/.oh-my-zsh/custom/themes/powerlevel10k \
    && sed -i 's|^ZSH_THEME=.*|ZSH_THEME="powerlevel10k/powerlevel10k"|' $HOME/.zshrc

# Configure npm global path
RUN echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> $HOME/.zshrc \
    && npm config set prefix '~/.npm-global'

# Verify node & npm versions
RUN node -v && npm -v

CMD ["zsh"]
