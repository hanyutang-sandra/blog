---
layout: post
title: From a Jekyll blog to Ruby (Basics)
category: Tech
---

For someone who works primarily around Python & JavaScript (and recently started iOS dev with Obj-C and Swift), setting up this blog with [Jekyll](https://jekyllrb.com/) is my first experience to interact with everything Ruby. I had some struggles during development around understanding some terminologies and setting up the environment, but I found comparing them with what I know in Python and JavaScript works well for me.

<!--more-->

## Ruby, Gems, and RubyGems 💎

Ruby is ... 💎

> A dynamic, open source programming lanaguage with a focus on simplicity and productivity. ([source]([Ruby Programming Language](https://www.ruby-lang.org/en/)))

This should be fairly straightforward, but I got interested in how the official websites describe the languages in 1 sentence. So here we go:

Python is ... 🐍

> a programming language that lets you work quickly and integrate systems more effectively. ([source](https://www.python.org/))

JavaScript is ... 🕸

> the world's most popular programming language.
> 
> the programming language of the Web.
> 
> easy to learn. ([source]([JavaScript Tutorial](https://www.w3schools.com/js/)))

And into the iOS realm. Objective-C is ... 💻

> the primary programming language you use when writing software for OS X and iOS. it's a superset of the C programming language and provides object-oriented capabilities and a dynamic runtime. ([source]([About Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)))

Finally, Swift is ... 💨

> a powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS and watchOS. ([source]([Swift - Apple Developer](https://developer.apple.com/swift/)[Swift - Apple Developer](https://developer.apple.com/swift/)))

##### And back to the scheduled programme...

For programs written in these languages, they can invoke some functionalities that are provided by packages (or libraries). 

🐍 In the world of Python, we call them **Packages** or **Libraries**. The tool we often use for managing these packages/libraries is **PyPi**. To install and manage them, we often use `pip install`. The configuration file **requirement.txt** is also commonly used to conveniently install the specified package with the specified version. 

🕸 Relatively, in the world of JavaScript, we also use **Packages**/**Libraries** to provide some additional functions to our program. The tool we use for managing them changes to **NPM** or **Yarn** and we use `npm install` or `yarn add` for installing packages. The configuration file **package.json** acts similiar to **requirement.txt** in terms of specifying the versions of the depencies (and with a lot more other responsibilities).

💻 For Cocoa applications, the tools and config file we use change to **Carthage** and **Cartfile**. The command we use becomes `carthage update`.

💎 And now back to the world of Ruby, a **Gem** is just another saying for a package and library and **RubyGem** is a tool to install, create, manage and load these packages in the Ruby envrionment ([source](https://github.com/rubygems/rubygemshttps://github.com/rubygems/rubygems)). A **Gemfile** is similiar to **requirement.txt**, **package.json** and **Carfile**, listing the gems used by the progrem. To install a gem, use `gem install` 

For Jekyll specifically, a **Bundler** (also a gem) is used to install all gems in the **Gemfile** by using `bundle install`. 

## Gotchas when working with RubyGems 💎

- To install a gem without a Bundler, use `gem install <gemName>`. However, unlike NPM which provides both global install option with `npm install -g` and local install option with `npm install`, gem installation is always system wide, and the package is always available for any projects within the system. 

- When using `--user-install` option with `gem install`, RubyGems will install the gems to a directory inside your home directory. For programs installed there to be available, you need to add the destination to your **PATH** environment variable
