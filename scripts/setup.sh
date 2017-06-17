# install dependencies

yarn

# copy assets files

assets=( favicon.ico icon.png fonts )

for i in "${assets[@]}"
do
	cp public/$i ng/src/$1 -r
	cp public/$i react/public/$1 -r
done

# render markdown

yarn generate:post
yarn generate:rss

# copy json files

json=( link.json post.json )

for i in "${json[@]}"
do
	cp public/$i ng/src/$i # Angular
	cp public/$i react/src/$i # React
done

# copy html files

cp public/html ng/src/html -r # Angular
cp public/html react/public/html -r # React
