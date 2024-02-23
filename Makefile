# Self Documenting Makefile, add comment prepended with ## before each make command

include .env
export

## Push changes to Github and Sync Quartz Framework
push:
	npx quartz sync

## Serve Quartz
serve:
	npx quartz build --serve

## Prepare content foilder, do this before sync
prepare-folder:
	mkdir -p ./content/Files/Public ./content/Unfinished

## Setup env
prepare-env:
	cp .env.example .env

## Prepare node_modules
prepare-node-modules:
	npm i

## Initialize the project, run this in the first time
init: prepare-folder prepare-env prepare-node-modules
	@echo "Please update .env file with your Obsidian folder path"
	@echo "Also make sure you already have fswatch installed, if not please install it using brew"

## Sync Content from Obsidian Folder
sync: 
	rsync -azP --delete "${OBSIDIAN_FOLDER}/Files/Public" ./content/Files
	rsync -azP --delete "${OBSIDIAN_FOLDER}/index.md" ./content/
	rsync -azP --delete "${OBSIDIAN_FOLDER}/Unfinished" ./content/

## Auto sync between OBSIDIAN_FOLDER and content folder
watch-sync: sync
	@echo "Watching for changes in Obsidian Folder, now open new terminal and run make serve to start the dev server"
	fswatch -o "${OBSIDIAN_FOLDER}/Files/Public" "${OBSIDIAN_FOLDER}/index.md" "${OBSIDIAN_FOLDER}/Unfinished"| while read f; do make sync; done

.DEFAULT_GOAL := show-help
# See <https://gist.github.com/klmr/575726c7e05d8780505a> for explanation.
.PHONY: show-help
show-help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')
