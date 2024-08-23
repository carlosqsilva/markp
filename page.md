The TextBundle file format aims to provide a more seamless user experience when exchanging plain text files, like Markdown or Fountain, between sandboxed applications.

Sandboxing is required for all apps available on the Mac and iOS app store, in order to grant users a high level of data security. Sandboxed apps are only permitted access to files explicitly provided by the user - for example Markdown text files. When working with different Markdown applications, sandboxing can cause inconveniences for the user.

An example: Markdown files may contain references to external images. When sending such a file from a Markdown editor to a previewer, users will have to explicitly permit access to every single image file.

This is where TextBundle comes in. TextBundle brings convenience back - by bundling the Markdown text and all referenced images into a single file. Supporting applications can just exchange TextBundles without asking for additional permissions. Beyond being a simple container, TextBundle includes a standard to transfer additional information - to open up new possibilites for future integration.

You can download a simple example file for a [TextBundle file (Version 2)](https://textbundle.org/downloads/example-bundle-v2.zip) and its compressed variant [TextPack](https://textbundle.org/downloads/example.textpack). We provide also an example for apps only supporting [TextBundle file (Version 1)](https://textbundle.org/downloads/example-bundle-v1.zip).

Supporting Apps
---------------

OS

Reading

Writing

Standard

[![](https://textbundle.org/images/apps/agenda.png)](https://agenda.com/)

[Agenda](https://agenda.com/)

macOS, iOS, iPadOS

14.0

14.0

v2

[![](https://textbundle.org/images/apps/bear.png)](https://bear-writer.com/)

[Bear](https://bear-writer.com/)

macOS, iOS, iPadOS

1.0

1.0

v2

[![](https://textbundle.org/images/apps/craft.png)](https://craft.do/)

[Craft](https://craft.do/)

macOS, iOS, iPadOS, web

1.0

1.0

v2

[![](https://textbundle.org/images/apps/deckset.png)](https://www.deckset.com/)

[Deckset](https://www.deckset.com/)

macOS, iOS, iPadOS

1.0 (iOS), 2.0.28 (macOS)

1.0 (iOS), 2.0.28 (macOS)

v2

[![](https://textbundle.org/images/apps/ebookbinder.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--eBookBinder)

[eBookBinder](https://xelaton.com/index.php?lang=en&rubrik=Applications--eBookBinder)

macOS

1.4.0

1.4.0

v2 (md, html, Textile, Wikitext, BBCode, Smark)

[![](https://textbundle.org/images/apps/fsnotes.png)](https://fsnot.es/)

[FSNotes](https://fsnot.es/)

macOS

2.0

2.0

v2

[![](https://textbundle.org/images/apps/goedit.png)](https://basilsalad.com/ios/go-edit/)

[Go Edit](https://basilsalad.com/ios/go-edit/)

iOS, iPadOS

1.0

1.0

v2 (md, html)

[![](https://textbundle.org/images/apps/hashgazer.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--HashGazer)

[#Gazer](https://xelaton.com/index.php?lang=en&rubrik=Applications--HashGazer)

macOS

1.0

1.0

v2

[![](https://textbundle.org/images/apps/highlights.png)](https://www.highlightsapp.net/)

[Highlights](https://www.highlightsapp.net/)

macOS

\-

1.0

v1

[![](https://textbundle.org/images/apps/ithoughts.png)](https://www.toketaware.com/)

[iThoughts](https://www.toketaware.com/)

macOS, iOS, iPadOS, Windows

\-

4.11 + (macOS), 2.3 + (Windows), 2.7 + (iOS)

v1

[![](https://textbundle.org/images/apps/keepmark.png)](https://keepmark.io/)

[Keepmark](https://keepmark.io/)

Linux, macOS, Windows

1.7

1.7

v2 (Textpack)

[![](https://textbundle.org/images/apps/marked2.png)](https://www.marked2app.com/)

[Marked 2](https://www.marked2app.com/)

macOS

2.3.4

2.5

v1

[![](https://textbundle.org/images/apps/markmywords.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--MarkMyWords)

[MarkMyWords](https://xelaton.com/index.php?lang=en&rubrik=Applications--MarkMyWords)

macOS

1.10.0

1.10.0

v2

[![](https://textbundle.org/images/apps/mindnode.png)](https://www.mindnode.com/)

[MindNode](https://www.mindnode.com/)

macOS, iOS, iPadOS

2.5 + (macOS), 4.5 + (iOS)

2.5 + (macOS), 4.5 + (iOS)

v2

[![](https://textbundle.org/images/apps/myary.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--Myary)

[Myary](https://xelaton.com/index.php?lang=en&rubrik=Applications--Myary)

macOS

1.5.0

1.5.0

v2

[![](https://textbundle.org/images/apps/note-c.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--Note-C)

[Note-C](https://xelaton.com/index.php?lang=en&rubrik=Applications--Note-C)

macOS

1.5.0

1.5.0

v2

[![](https://textbundle.org/images/apps/onejotter.png)](https://onejotter.com/)

[One Jotter](https://onejotter.com/)

Android, Windows

1.83

1.83

v2

[![](https://textbundle.org/images/apps/paper.png)](https://papereditor.app/)

[Paper](https://papereditor.app/)

macOS

46

\-

v2

[![](https://textbundle.org/images/apps/smartdown.png)](https://www.aflava.com/)

[Smartdown II](https://www.aflava.com/)

Windows

\-

0.8.2

v2

[![](https://textbundle.org/images/apps/taio.png)](https://taio.app/)

[Taio](https://taio.app/)

macOS, iOS

1.0

1.0

v2

[![](https://textbundle.org/images/apps/textbundle-editor.png)](https://xelaton.com/index.php?lang=en&rubrik=Applications--Textbundle%20Editor)

[Textbundle Editor](https://xelaton.com/index.php?lang=en&rubrik=Applications--Textbundle%20Editor)

macOS

1.0

1.0

v2

[![](https://textbundle.org/images/apps/ulysses.png)](https://www.ulysses.app/)

[Ulysses](https://www.ulysses.app/)

macOS, iOS, iPadOS

2.7

1.2.2

v2

[![](https://textbundle.org/images/apps/wordpress.png)](https://apps.wordpress.com/mobile/)

[WordPress](https://apps.wordpress.com/mobile/)

iOS, iPadOS

12.3

\-

v2

[![](https://textbundle.org/images/apps/xmind.png)](https://www.xmind.app/)

[Xmind](https://www.xmind.app/)

macOS, iOS, iPadOS

9.1.0

9.1.0

v2

[![](https://textbundle.org/images/apps/zettlr.png)](https://www.zettlr.com/)

[Zettlr](https://www.zettlr.com/)

macOS, Linux, Windows

1.2.0

1.2.0

v2

### TextBundle framework for macOS and iOS

Developers can easily incorporate TextBundle import and export with the TextBundle library from Shiny Frog. See the [GitHub repository](https://github.com/shinyfrog/TextBundle) for details.

### Quick Look on OS X

Properly formatted TextBundle files can be viewed with Quick Look on OS X by installing [Brett Terpstra’s fork of the MultiMarkdown QuickLook plugin](https://brettterpstra.com/2015/06/03/mmd-quicklook-1-dot-2-with-textbundle-support/). Be sure to run `qlmanage -r` in Terminal after installing or upgrading the plugin.

### Logo

You can download the official logo of TextBundle in various file formats [here](https://textbundle.org/downloads/textbundle-logo.zip). The logo was created by [Brett Terpstra](https://brettterpstra.com/). It is published under the [CC0](https://creativecommons.org/publicdomain/zero/1.0/) license, so you can use it without restrictions.

### Join us!

Like to join in with your app? Please [drop us a line](mailto:info@textbundle.org) or write us on [twitter](https://twitter.com/txtbndl)!