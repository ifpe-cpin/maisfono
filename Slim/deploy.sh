#!/bin/bash
set -e # termina o script com um código diferente de 0 se alguma coisa falhar

# pull requests e commits para outras branches diferentes da master 
# não devem fazer o deploy, isso é opcional caso queira deletar as próximas 6 linhas
# fique a vontade
SOURCE_BRANCH="master"

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy."
    exit 0
fi

pwd
#ls -la
#ssh -i ./deploy_key jrpiresc@108.167.188.84
#ssh -p 2222 jrpiresc@108.167.188.84


# Forçando o push do master para a branch gh-pages (Toda história anterior da branch
# gh-pages será perdido, pois vamos substituí-lo.)  Redirecionamos qualquer saída para
# /dev/null para ocultar quaisquer dados de credenciais sensíveis que de outra forma possam ser expostos.
# tokens GH_TOKEN e GH_REF serão fornecidos como variáveis de ambiente Travis CI
#git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

