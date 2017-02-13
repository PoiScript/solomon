"use strict";
var fs = require('fs');
var marked = require('marked');
var cheerio = require('cheerio');
var path = require('path');
var Post_1 = require("./src/app/classes/Post");
var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    var escapedText = text.replace(/[^\u2E80-\u9FFF|^\w]+/g, '-');
    return "\n\t\t<h" + level + " id=\"" + escapedText + "\">\n\t\t\t<a class=\"anchor\" name=\"" + escapedText + "\" href=\"#" + escapedText + "\">\n\t\t\t\t<span class=\"header-link\"></span>\n\t\t\t</a>" + text + "\n\t\t</h" + level + ">\n\t";
};
var files = [];
var posts = [];
function walk(walkPath) {
    fs.readdirSync(walkPath)
        .forEach(function (item) {
        if (fs.statSync(walkPath + "/" + item).isDirectory())
            walk(walkPath + '/' + item);
        else if (item === 'link.md')
            return;
        else if (path.extname(item) === ".md")
            files.push(fs.readFileSync(walkPath + "/" + item, 'utf8'));
    });
}
function parse() {
    files
        .forEach(function (file) {
        var tokenStart = file.indexOf('```json');
        var tokenEnd = file.indexOf('```', 1);
        if (tokenStart === -1)
            return console.error('[ERROR] Markdown Metadata Missed');
        var post = new Post_1.Post();
        post.intro = JSON.parse(file.substr(tokenStart + 8, tokenEnd - 9));
        post.html = marked(file.substr(tokenEnd + 3), { renderer: renderer });
        post.bookmark = [];
        var $ = cheerio.load(post.html);
        $('.anchor').each(function (i, item) {
            post.bookmark.push(item.attribs['name']);
        });
        posts.push(post);
    });
}
function generatePostJSON() {
    posts
        .sort(function (p1, p2) { return Date.parse(p1.intro.date) - Date.parse(p2.intro.date); })
        .forEach(function (post, index) {
        if (post.intro.slug === 'about') {
            fs.writeFile("src/json/about.json", JSON.stringify(post), function (err) {
                if (err)
                    console.error(err);
                console.log("[GENERATED] about.json");
            });
        }
        else {
            if (index > 0) {
                post.previous_title = posts[index - 1].intro.title;
                post.previous_slug = posts[index - 1].intro.slug;
            }
            if (index < files.length - 1) {
                post.next_title = posts[index + 1].intro.title;
                post.next_slug = posts[index + 1].intro.slug;
            }
            fs.writeFile("src/json/" + post.intro.slug + ".json", JSON.stringify(post), function (err) {
                if (err)
                    console.error(err);
                console.log("[GENERATED] " + post.intro.slug + ".json");
            });
        }
    });
}
function generateCategoryJSON() {
    var categories = [];
    posts
        .filter(function (post) { return post.intro.slug !== 'about'; })
        .forEach(function (post) {
        var i = categories.map(function (category) { return JSON.stringify(category.title); }).indexOf(JSON.stringify(post.intro.category));
        if (i === -1)
            categories.push({ title: post.intro.category, intros: [post.intro] });
        else
            categories[i].intros.push(post.intro);
    });
    categories.forEach(function (category) { return category.count = category.intros.length; });
    fs.writeFile("src/json/categories.json", JSON.stringify(categories), function (err) {
        if (err)
            console.error(err);
        console.log("[GENERATED] categories.json");
    });
}
function generateArchiveJSON() {
    fs.writeFile("src/json/archive.json", JSON.stringify(posts.map(function (post) { return post.intro; }).filter(function (intro) { return intro.slug !== 'about'; })), function (err) {
        if (err)
            console.error(err);
        console.log("[GENERATED] archive.json");
    });
}
function generateLinkJSON(walkPath) {
    var links = [];
    var file = fs.readFileSync(walkPath + "/link.md", 'utf8');
    file
        .substring(file.indexOf('|:--:|:--:|:--:|:--:|:--:|') + 28, file.lastIndexOf('|')).split('|\n|')
        .forEach(function (line) {
        links.push({
            github_username: line.split('|')[0],
            display_name: line.split('|')[1],
            link_text: line.split('|')[2],
            link_address: line.split('|')[3],
            bio: line.split('|')[4] || ''
        });
    });
    fs.writeFile("src/json/link.json", JSON.stringify(links), function (err) {
        if (err)
            console.error(err);
        console.log("[GENERATED] link.json");
    });
}
walk('src/markdown');
console.log("[INFO] " + files.length + " files found.");
parse();
generatePostJSON();
generateCategoryJSON();
generateArchiveJSON();
generateLinkJSON('src/markdown');
