# copy assets files

assets=( favicon.ico icon.png )

for i in "${assets[@]}"
do
	cp public/$i ng/src/$1
	cp public/$i react/public/$1
done

# fetch post

git clone --depth=1 https://github.com/PoiScript/Solomon-Post.git content

# render markdown and link

yarn generate:post
yarn generate:link
yarn generate:rss

# copy output files

output=( html json )

for i in "${output[@]}"
do
	cp public/$i ng/src/assets/$1 -r
	cp public/$i react/src/$1 -r
done
