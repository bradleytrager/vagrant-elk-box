var SearchApp = angular.module('SearchApp', [])
	.controller('SearchController', function($scope, $http, $sce) {
		$scope.data = [];
		// $http.get('/search').then(function(res) {
		// 	$scope.data = res.data.hits.hits;
		// 	console.log($scope.data);
		// });
		$scope.$sce = $sce;
		$scope.searchTerm = 'הנשמה';
		$scope.search = function(query) {
			$scope.query = query;
			addSearchHistory(query);
			
			$http.get('http://localhost:9200/_search?q=' + query).then(function(res) {
				$scope.data = res.data.hits.hits.map(function(doc) {
					return {
						_source: {
							title: doc._source.title,
							link: doc._source.link,
							content: render(doc._source.content)
						}
					};

				});;
				console.log($scope.data);

			});
		};

		$scope.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

		function addSearchHistory(term) {
			if ($scope.searchHistory.indexOf(term) === -1) {
				$scope.searchHistory.push(term);
				localStorage.setItem("searchHistory", JSON.stringify($scope.searchHistory));
			}
		}

		function render(content) {
			var queryTerms = $scope.query.split(" ");

			queryTerms.forEach(function(term) {
				content = content.replace(new RegExp(term, "g"),' <b>' + term + '</b> ');
			});

			return content;
		}
	});

// SearchApp.run(function($httpBackend) {
// 	var searchResponse = {"took":2,"timed_out":false,"_shards":{"total":1,"successful":1,"failed":0},"hits":{"total":23838,"max_score":1.0,"hits":[{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl1vTUHFsW-16UN9","_score":1.0,"_source":{"title":" ליקוטי תורה\r\n  -  שיר השירים\r\n  -  יט ב\r\n\r\n","content":"<p>יט ב</p><p>העם רואים כו' ועמ\"ש סד\"ה ועשית בגדי קדש שיש כמה מדריגות בענין הלבושים שממעשה המצות וכנז\"ל ולכן ע\"י הראיני את מראיך נמשך שיהי' הלבושים הנעשים ממעשה המצות שהוא בחי' יפתי מבחינות היותר עליונות כו'):</p><p>עוד ביאור הדברים ע\"פ יונתי בחגוי הסלע וגו' הנה ארז\"ל נובלות חכמה שלמעלה תורה. כי התורה הנגלית היא בחינת הארת החכמה המתלבשת במדות ולכן הם גם כן שיתא סדרי משנה כנגד ששה מדות עליונות סדר זרעים מבחינת חסד כו' והענין הור כי כשר ופסול טמא וטהור חייב וזכאי נמשך מהמדות עליונות דהיינו כשר ומותר וטהור זהו בחינת חסד וימין מקרבת שיתעלה אותו דבר ליכלל באור א\"ס ופסול ואסור וטמא היינו בחינת גבורה שמאל דוחה שלא יוכל להתעלות כו' וכ\"ז הוא ע\"פ חכמתו ית' חכים ולא בחכמה ידיעא הנמשכת ומתלבשת במדותיו ית' ולכן נקרא התורה נובלות חכמה של מעלה (בבראשית רבה פרשה י\"ז) כי חכמה זו המתלבשת במדות היא בחי' נובלות לבד לגבי עצמיות חכמה עילאה חכמתו ית' שהיא רמה ונשגבה למעלה מהמדות כו' (ועמ\"ש בד\"ה השמים כסאי כו' דקאי על התורה שנקרא כסאי לבחינת רצונו וחכמתו ובינתו כו' והיינו מה\"ט וע\"ש מענין זה) ולכן נאמר בישראל קדש ישראל לה' ראשית תבואתה שישראל הוא ראשית ומקור התורה כי הנה ישראל עלו במחשבה. פי' מחשבה היינו בחינת חכמה ועלו במחשבה היינו בבחינה העליונה שבמחשבה (והיינו כענין במחשבה תחלה דהיינו תחלת המחשבה) והענין כי הנה בענין השתלשלות עילה ועלול הנה פנימית העילה הוא דבוק בעילתו רק חיצוניותו הוא הנמשך בההשפעה להעלול. ועד\"ז הוא נמשך ומשתלשל מעילה לעילה הכל רק באופן זה שמבחינת חיצוניות העליון נעשה פנימיות לתחתון (ועמ\"ש מזה באריכות קצת בפ' שלח בד\"ה ענין נסכים) וא\"כ לפ\"ז הכלל הרי החכמה עילאה שמקבלת מבחינת כתר כמ\"ש והחכמה מאין תמצא הרי הבחינה עליונה שבחכמה ופנימיותה דבוקה בכתר עליון (וע' בפרדס שער שלישי פ\"ג כל ספירה וספירה תבחן בג' בחינות כו' ובשער הנתיבות רפ,ג הנתיב האחד כו' יחוד החכמה בכתר כו' ועוד שם שכל מופלא נדמה למאציל כו' ועיין בפ' פנחס (דרנ\"ו סע\"ב)) ומה שנמשך ומתפשט מבחינת חכמה למטה במדות זהו רק מבחינת חיצוניות החכמה וזהו ענין נובלות חכמה כנ\"ל אכן נש\"י שעלו במחשבה היינו בבחינ' העליונה שבמחשבה כי לכן הרי נאמר בנים אתם לה' בני בכורי ישראל שכמו עד\"מ הבן הנמשך ממוח האב הרי מלובש בהטפה מעצמיות ומהות החכמה שבמוח האב כו'. וכך נש\"י שרשן ומקורן מעצמיות ופנימית ח\"ע ממש שלמעלה מבחי' נובלות וחיצוניות כו' וכמ\"ש בד\"ה ששים המה מלכות כו' בפי' כנס\"י שבפנימיות ז\"א כו' ע\"ש. ועמ\"ש ג\"כ בד\"ה אני ישנה. בפי' עלו במחשבה דהיינו בחינת מחשבה שבמחשבה כו' ע\"ש וא\"כ עד\"ז גם כאן היינו שנש\"י שרשן מבחינה העליונה שבח\"ע ולכן הם ראשית תבואתה והם מקור ויסוד התורה שהיא בחי' נובלות חכמה. ולכן נקראת התורה תורת משה כו' והיינו לפי שנשמת משה שרשה מעצמיות ח\"ע שזהו מקור התורה וכמ\"ש מזה בד\"ה להבין ענין לחם משנה בפ' בשלח. שלכן נאמר במשה כבד פה לגבי אורייתא דבע\"פ כו' וכבד לשון לגבי תשב\"כ שלא היה יכול להשפיל א\"ע להיות נמשך ממנו התורה שהיא בחי' נובלות חכמה כו' ועמ\"ש בד\"ה משה ידבר. ועמ\"ש סד\"ה ועשית בגדי קדש שזהו ענין שהתורה נק' כלה ומאורסה וישראל הם בחי' חתן המשפיע כו'. והנה הגם שזהו בחינת משה אך כמ\"כ יש ג\"כ נשמות גבוהות מאד שיש בהם מבחינת משה וזהו שאמר רב ספרא לרבא משה שפיר קאמרת כו' והן הנשמות שנק' אחים וריעים למקום כמ\"ש למען אחי ורעי כו' ומבואר בזהר שהן למעלה אפילו</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl16TUHFsW-16UN-","_score":1.0,"_source":{"title":" כתר שם טוב\r\n  -  הוספות\r\n  -  קמז\r\n\r\n","content":"<p>קמז</p><p>מאמר הבעש\"ט באחת משיחותיו הקדושות: הנני מעיד עלי שמים וארץ, אשר במשפט הקשה שהי' על איש אחד בבית-דין של מעלה והוא איש פשוט שלא ידע רק להתפלל ולאמר תהלים, והי' מופלא באהבת ישראל בכל כחות נפשו: במחשבה שחשב תמיד באהבת ישראל, בדבור שהי' מדבר באהבת ישראל ומעשה שהי' מהנה לכל אחד מישראל כפי כחו, הצטער בצערו של כל אחד מישראל בין איש ובין אשה ושמח בשמחתו, ופסקו בבית-דין של מעלה חלקו בגן עדן בין הצדיקים הגאונים שאמרו רז\"ל שהם אוהבי ישראל.</p><p>דער קרעכץ וואָס אַ איד גיט אויף דעם צער ח\"ו פון אַ צווייטן אידן – צוברעכט אַלע מחיצות של ברזל פון די מקטרגים, און די שמחה און ברכה וואָס אַ איד פרייט זיך מיט דער שמחה פון נאָך אַ אידן און בענטשט אים – איז מקובל באַ השי\"ת ווי תפלתו של ר' ישמעאל כהן גדול אין קדש הקדשים314.</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl2PTUHFsW-16UN_","_score":1.0,"_source":{"title":" אור תורה\r\n  -  תהלים\r\n  -  רה-ה\r\n\r\n","content":"<p>רה-ה</p><p>פעמים יכול לומר התפילה במהירות גדולה [נ\"א: מאד], מחמת שבוער בלבו אהבת הש\"י מאוד, והתיבות יוצאים מפיו מעצמם.</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl2nTUHFsW-16UOA","_score":1.0,"_source":{"title":" תורה אור\r\n  -  וישב\r\n  -  כז,א\r\n\r\n","content":"<p>כז,א</p><p>גרעון באהבה ויראה טבעי' שבחיצונית הלב הגלוים מ\"מ יהיה לה יתרון בבחי' רעותא דלבא בנקודת פנימית הלב כיתרון האור הבא מן החשך דוקא. וביאור הענין כי הנה כתיב אני ראשון ואני אחרון ומבלעדי אין אלהים. פי' ע\"ד מ\"ש אני ה' לא שניתי ואתה הוא קודם שנברא וכו' בלי שום שינוי כי אין בריאת עולמות עליונים ותחתונים תופסים מקום כלל וכולא קמיה כלא חשיב ממש. ומבלעדי פי' מה שהוא זולת בחי' זו דהיינו באמצעות הזמן שנראה העולם ליש ודבר בפ\"ע בחי' זמן ומקום אין אלהים זולתי שהוא בחי' אלהים חיים ומלך עולם כמאמר ומבלעדיך אין לנו מלך גואל וכו' שכל העולמות עליונים ותחתונים נתהוו מבחי' מלכותו ית' וכדכתיב מלכותך מלכות כל עולמים וגו' ושם עלו השגת כל הנבראי' העליונים ותחתוני' אבל בהקב\"ה בכבודו ובעצמו לית מחשבה תפיסא ביה כי הוא רם ונשא מגדר ההשגה ואינו נתפס בתוך עלמין לא בבחי' ממלא ולא בבחי' סובב בשום שכל והשגה בעולם אלא ברעותא דלבא מקרב איש ולב עמוק. וכמ\"ש ממעמקים קראתיך ה' מפני כי בחי' רעותא דלבא נמשך מהתבוננות זו עצמה אם ישים אליו לבו דלית מחשבה תפיסא ביה כלל והוא רם ונשא למעל' מעלה עד אין קץ ותכלית אפילו מבחי' חכמה עילאה. אי לזאת תכסף ותכלה נפשו לבטל במציאות אליו יתב' לצאת ממאסר הגוף נרתקה ולהשתפך אל חיק אביה משא\"כ הנשמה טרם ירידתה להתלבש בגוף היתה אהבתה ודבקותה בשרשה לפ\"ע השגתה וכן לענין היראה:</p><p>והנה בזמן שהיה בהמ\"ק קיים היה נמשך בחינה זו רעותא דלבא מגילוי אא\"ס ב\"ה בהיכל קדשי קדשים כו' כמ\"ש בתניא להיות בטל רצונו לרצונו ית' וכמ\"ש כי תהיו לי ארץ חפץ. אך בזמן הגלות הנה כתיב ובקשתם משם את ה' אלקיך ומצאת וגו' משם דייקא דהיינו כשתתבונן על ההיפוך מדרכי ה' איך שהוא רחוק מה' בתכלית הריחוק כמו עובר רצונו ומאין נשפע להם שפע וחיות להיות בהם חיות וקיום מרצונו ית' שרצונו ית' הוא המחיה אותם כמ\"ש ואתה מחיה את כלם. אך על זה אמרו כמה ארך אפים לפניו שמבחי' ארך אפים נמשך ונשתלשל ממדרגות עליונות דרך נפילה להחיות העכו\"ם אף שהם עוברי רצונו. וזהו אם לעוברי רצונו כך לעושי רצונו על אחת כמה וכמה שיושפע בחינת רצון עליון שהוא למעלה מעלה מגדר עלמין שלא בבחי' ירידת והשתלשלות המדרגות בבחי' חכמה ומדות אלא בבחי' פנימית נקודת הלב שהיא בחי' תשובה עילאה שקדמה לעולם. וזהו כי תדרשנו בכל לבבך ובכל נפשך. דהיינו שיהפך לבו מן הקצה אל הקצה ואתהפכא חשוכא לנהורא ע\"י בחי' רעותא דלבא זו למאוס בחיי עוה\"ז ותענוגים ולמשוך לבו ונפשו לדבקה בו ית'. והנה כל זה ע\"ד משל הסוחר הנ\"ל שמוציא כסף וזהב מרשותו להיות מפזר ונוסף עוד. כך הנשמה אע\"פ שמוציאה כסף וזהב שהוא בחי' אהבה ויראה הגלוים להתלבש ולהסתיר בגוף ונפש הבהמית הנה עי\"ז יש לה יתרון בבחי' רעותא דלבא כרשפי אש מן ההפוך. וזהו וחם הוא אבי כנען בזקף גדול שחמימות רשפי אש ושלהבת העולה למעלה מההיפוך הוא העושה בחי' כנען לסחור כנ\"ל כמ\"ש טעמה כי טוב סחרה וגו'. אך מתחלה צריך להקדים בחי' יראה תתאה שהיא נמשכת מבחינת מלכותו ית' שהיא נק' בחי' כנען העליונה דקדושה שמזה יעלה ויבא ויגיע להיות בחי' כנען בידו מאזני מרמה להגיע לבחי' רעותא דלבא בחי' פנימית הלב כנ\"ל. וזהו קרוב ה' לכל קוראיו לכל אשר יקראהו באמת דהיינו באמתות נקודת</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl21TUHFsW-16UOB","_score":1.0,"_source":{"title":" תורה אור\r\n  -  וישב\r\n  -  כח,ג\r\n\r\n","content":"<p>כח,ג</p><p>גבוה כו' א\"כ איך ישתחוה ליוסף וזה תמוה. אך הענין כי השתחוואה כוללת ב' בחי'. הא' בחי' בטול שבטל ומשתחוה כו' כמו וצבא השמים לך משתחוים שהם מתבטלים כו'. הב' הוא ענין המשכה שמרכין ראשו וממשיכו למטה. ובאמת הא בהא תליא שע\"י הבטול גורם ההמשכה כו'. וכן ידוע ג\"כ מהשתחוואה שבש\"ע באמרו בא\"י שהוא בחי' בטול וגם המשכה ע\"י שמרכין ראשו וממשיך מבחי' ברוך בבחי' אתה כמבואר בפע\"ח. ועד\"ז יובן ענין ותשתחוין לאלומתי. כי הנה השבטים כשהעלו מ\"ן במלכות וצריכים לעורר המשכת מ\"ד דאצילות שעי\"ז עיקר הבירור. ובאמת אין המ\"ד נמשך אלא לאחר שיש העלאת מ\"ן כי לית ברכתא שריא באתר ריקניא רק כשיש כלי אז שורה האור והמ\"ן הוא כלי להמ\"ד. לכן כדי לעורר המשכת מ\"ד דיוסף היה צ\"ל תחלה העלאת מ\"ן דהשבטים בבחינת בטול לעורר המשכה זו. גם יובן זה ממשל גשמי בזיוג זכר ונקבה שאין קישוי אלא לדעת. וכשהנקבה עורכת שולחנה אז נתעורר תאות הזכר כו'. וזהו והנה תסובינה אלומותיכם שעשו הכלי והעלאת מ\"ן ותשתחוין לאלומתי. ובהשתחואה זו עשו ב' בחי' א' הבטול שלהם לאור א\"ס הב' שעי\"ז עשו ג\"כ ההמשכה שיומשך המ\"ד דהיינו שיומשך הארת הא\"ס בבחי' יוסף והמשכה זו שעשו הם היינו שיומשך בחי' האו\"פ ביוסף. ואמנם השתחואה דיעקב היה רק ענין המשכה לבדה שהמשיך בחי' המקיף ליוסף כו'. והנה סבת שנאת השבטים ליוסף על חלומותיו כו' הוא לפי שהם טעו בדבר א'. בהיות כי ידוע בענין ששם עלו שבטים שבטי י\"ה כו'. שיש בחי' י\"ב גבולי אלכסון בז\"א דאצילות ונק' שבטי י\"ה שנמשכים מאו\"א. ולזאת סברו השבטים שלמטה ששרשן משם וא\"כ הם במדרגה אחת עם יוסף שכולן שרשן מז\"א דאצילות וא\"כ אין צריכים לו בשביל המשכת המ\"ד שהרי כמוהו כמוהם משרש א' מבחי' ז\"א שמשם המשכת המ\"ד. אבל טעו בזה כי אמת ששרשם מז\"א כנ\"ל אבל הם בעצמם למטה בבריאה. וכנ\"ל בענין בחי' י\"ב בקר שהים עומד עליהם מלמעלה הילכך הם רק המעלים מ\"ן למלכות. משא\"כ יוסף שלמטה הוא עצמו מבחי' יסוד דאצילות ממש ולפיכך הוא דוקא הממשיך מ\"ד והם צריכים לו כמו שכתוב והנה תסובינה אלומותיכם כו' כנ\"ל:</p><p>שיר המעלות בשוב כו' היינו כחולמים. הנה החלום הוא מחבר שני הפכים בנושא א' ומרכיב שני ענינים הפכיים כאלו היו לאחדים. והיינו מפני כי בשינה נסתלק מוח השכל המבחין ולא נשאר רק כח המדמה. וכח המדמה יכול להרכיב ב' ענינים הפכיים כמו ספינה רצה באויר כו' כמ\"ש הרמב\"ם בשמונה פרקים רק שבהקיץ שמתעורר כח השכל הוא השולט על כח המדמה ואינו מניחו להרכיב לפי שרואה בעין שכלו שהם דברים נפרדים ואינן מתאחדים כלל. וכך הענין בגלות ניצוץ אלקות בנפש האדם שהוא בבחינת שינה והסתלקות המוחין. יכול הוא להרכיב ב' דברים הפכיים להיות כל היום טרוד במו\"מ איש לבצעו מקצהו זה פונה לזיתו כו'. הגם שבתפלה מעורר את האהבה עד שתחפץ להתפשט מלבושיה כו' לדבקה בו ית' מחמת התבוננותו ביחו\"ע ויחו\"ת אעפ\"כ אחר התפלה חולפת ועוברת האהבה ואינו שם ללבו כי הוא הפוך ההתבוננות שבתפלה ומדמה בלב להרכיב ולחבר שני עניינים הפכיים יחד כאלו היה לאחדים ובאמת הם נפרדים ורחוקים זמ\"ז. כי הגם דכתיב בתורה שש שנים תזרע שדך. וכן בק\"ש ולעבדו בכל לבבכם כו' ונתתי מטר ארצכם כו' ואספת דגנך כו'. הנה הכל הוא ע\"ד עובדה כידוע שבכל עניני עוה\"ז יש בהם ענין</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl3MTUHFsW-16UOC","_score":1.0,"_source":{"title":" \r\nספרי כ\"ק אדמו\"ר הזקן \r\n  -  שו\"ת\r\n  -  סימן א\r\n\r\n","content":"<p>הנהא, מ\"ש הט\"ז באו\"ח הלכות תפילין סי' ל\"ב ס\"ק כ\"ו, שאם מניח פחות מכשיעור ט' אותיות אחר פרשת שמע ופחות מכשיעור קודם פרשה והיה אם שמוע, נעשית פרשת והיה אם שמוע סתומה לדברי הכל, שהריוח מכאן ומכאן מצטרף לכשיעור, אישתמיטתיה מה שכתב הטור בי\"ד סימן ער\"ה בענין סתומה, שאם גמר בסוף השיטה בפחות מכשיעור, יניח שיטה שניה חלוק ויתחיל בשיטה ג' דווקא, ולא סגי במה שיתחיל בשיטה שניה אחר שיניח ריוח מעט בכדי שיצטרף ריוח זה עם הריוח שבסוף שיטה הראשונה, ולמה לו להניח השיטה שניה חלק לגמרי, אלא ודאי דאין מצטרפין.</p><p>וכן הרמב\"םב שכתב בענין סתומה שאם אין בסוף השיטה כדי שיעור ט' אותיות ותיבה, יניח הכל פנוי ויניח מעט ריוח בשיטה שניה, לאו למימרא שהמעט ריוח מצטרף עם הריוח שבסוף שיטה הראשונהג, אלא דמיירי שהניח בסוף שיטה הראשונה כשיעור ט' אותיות רק שלא היה כשיעור גדול לכתוב גם תיבה אחר הריוח, ולזה מועיל מעט ריוח שבתחלת שניה שעושה אותה סתומה, מאחר שהניח כשיעור ט' אותיות במקום אחד, והוא שיעור פרשה להפריש וליתן ריוח בין פרשה לפרשה, אלא שאם לא היה מעט ריוח בתחילת שיטה שניה היתה פרשה פתוחה וע\"י המעט ריוח שמשייר בתחלה ומתחיל באמצע שיטה, נעשית פרשה סתומה, שעל ידי כן סותמות כל הריוח שבסוף השיטה הראשונה, דסבירא ליה בפירוש הירושלמיד, פתוחה מכאן ומכאן סתומה, כפשוטו, דאם היא פתוחה מסופו וגם מראשו, הרי היא נידונית כסתומה. ומ\"ש הרמב\"ם ז\"ל מעט ריוח כו', כתב כן מסברא דמעט ריוח נמי סגי, ולא בעינן כשיעור פתוחה דוקא מכאן ומכאן, דמאחר שהניח כשיעור במקום אחד סגי. אבל אם לא הניח כשיעור במקום אחד, רק שע\"י צירוף ב' מקומות יהיה הריוח כשיעור ודאי דלא מהני דמעט ריוח לא מהני לדעת הרמב\"ם, אלא לעשותו סתומה, מאחר דכבר נקרא שם פרשה עליה, אבל לא להשלים השיעור להיות נקרא פרשה על ידי כן.</p><p>והנה, הט\"ז נמשך אחר תשובת מהר\"ם פדואהה כמבואר בסיום דבריו, ומהר\"ם פדואה למד מהסמ\"ק הלכות מזוזהו, ובסמ\"ג שםז ביאר בפירוש דברי הירושלמי, פתוחה מכאן ומכאן סתומה, בכהאי גוונא שאין במקום אחד כשיעור, וכתב דהירושלמי דווקא לענין מזוזה אתמר, [ד]דווקא במזוזה היא סתומה, וכהאי גוונא להכירא בעלמא, לפי שאין הפרשיות סמוכות בתורה, והיא סתומה גמורה, שאין בה שיעור פרשה בסוף שיטה ולא בראש שיטה ע\"כ. ומשמע להדיא דרוצה לומר, דהוי סתומה גמורה כמו פרשת ויחי שאין שם פרשה כלל, והכי נמי אין נקרא עליו שם פרשה כלל, מאחר שאין שם שיעור פרשה לא בסוף שיטה הראשונה ולא בראש שיטה שאחריה. וזהו ג\"כ כוונת הרא\"שח והטור סי' רפ\"ח, עיין ב\"ח וב\"י שם דמבואר להדיא מדבריהם כך. ואם כן, אין ללמוד משם לתפילין להיות נקרא בשם פרשה סתומה. וגם, אין ללמוד משם להכשיר סתומה לגמרי שלא נקרא עליה שם פרשה כלל מזה הטעם עצמו שבמזוזה לפי שאין סמוכות בתורה, דהא במזוזה אמרינן בגמראט דאי עבדינהו פתוחות, שפיר דמי, מהאי טעמא לפי שאין סמוכות בתורה, ובתפילין קיימא לןי דאם שינה פסוליא.</p><p>ובאמת על מהר\"ם פדואה אין לתמוה כל כך, דבפתוחות נמי יש להכשיר בתפילין כמו במזוזהיב, א\"כ יש לומר דהוא הדין והוא הטעם בסתומה לגמרי. אבל הט\"ז עשה סמוכות לדברי הרמב\"םיג מהגמראיד, דיש לפסול בתפילין נמי כשהפרשה והיה אם שמוע פתוחה (ויש לחזק ראייתו ולהוסיף בה דברים, אלא שאין כאן מקום להאריךטו), ע\"ש בס\"ק כ\"ה, שכן הוא עיקר לדעתו, ואין ללמוד מתפילין למזוזה, וכן הביא דעת מהרמ\"אטז. וא\"כ לדידהו לא מהני סתומה לגמרי דמהני במזוזה להכירא בעלמא, דלא ילפינן תפילין ממזוזה כלל דלא כמהר\"ם פדואה, ואיך הסכימה דעתם לדעת מהר\"ם פדואה בסתומה זו. וצריך עיון גדול.</p><p>וממוצא דבר נשמע טוב טעם ודעת למ\"ש הבית יוסףיז בשם מהרי\"א, שהמנהג היותר מרווח שרוב הגליות נהגו כמותו, והוא שיניח בסוף פרשת שמע פחות מכשיעור וקודם פרשת והיה אם שמוע יניח ריוח כשיעור. וכן הביא בשלחן ערוךיח, ושם ביאר הטעם מפני שאי אפשר לעשות סתומה לדברי הכל, נהגו לעשות סתומה אליביה דהרמב\"ם.</p><p>והנה, גם להרמב\"ם יש דרך אחרת, להניח אחר פרשת שמע כשיעור, וקודם פרשת והיה אם שמוע יניח מעט ריוח, דהיא סתומה לרמב\"ם כמ\"ש בהדיא, ולמה יסדו המנהג דווקא כצורה הראשונהיט. אבל לפי מ\"ש בשם הסמ\"ג והסמ\"ק, ושכן הוא דעת הרא\"ש והטור ובית יוסף וב\"ח, שמעט ריוח תורתו כסתומה לגמרי, [אתי שפיר] מה שלא נהגו בצורה אחרת, להניח ריוח כשיעור אחר פרשת שמע וקודם פרשת והיה אם שמוע מעט ריוח, משום דלהפוסקים הנ\"ל מעט ריוח כמאן דליתא דמיא, והרי זה כאילו התחיל בראש שיטה ממש והוי פתוחה מסופו, ולכך בחרו בדרך הראשונה, להניח בסוף שמע פחות מכשיעור, והשיעור יניח קודם פרשת והיה אם שמוע, שאף שהריוח שאחר פרשת שמע אינו כלום, והרי זה כאילו גמר פרשת שמע בסוף שיטה ממש, מכל מקום במה שמתחיל והיה אם שמוע באמצע שיטה אחר שמניח ריוח כשיעור הוי סתומה, דפתוחה מראשה סתומה לדעת הרמב\"ם, לפי גרסתו בירושלמיכ, וכן העידו האחרונים שכן הוא בג[ירסת] הירושלמי שלפנינו. וכן משמע להדיא בב\"י וש\"ע למנהג זה, שאין מניחין ריוח כלל בסוף שמע, ואם מניחים הוא פחות מט' אותיות, מכלל שהריוח שהוא פחות מכשיעור, הרי זה כאילו אין מניחים כלל, דפחות משיעור אין נקרא ריוח כלל בסוף שיטה, והוא הדין והוא הטעם בתחילת שיטה. אלא שהרמב\"ם סבירא ליה מסברא דנפשיה, מאחר שהניח כשיעור במקום אחד בסוף שיטה הראשונה, סגי במעט ריוח שבתחילת שיטה שניה, ובהא לא רצו להנהיג כמותו, מאחר שעל סברא זו חולקין הפוסקים הנ\"ל, והמה הרבים ובתראי טפי.</p><p>אבל אכתי קשה למה הוצרכו להניח אחר פרשת שמע פחות מכשיעור דווקא. ומהרי\"א ביאר הטעם כי היכא דתהוי פרשת והיה אם שמוע סתומהכא. והרי אפילו אם הניח אחר פרשת שמע כשיעור, מכל מקום אם התחיל פרשת והיה אם שמוע באמצע שיטה אף שמניח ריוח כשיעור בתחילת שיטה הויא סתומה לדעת הרמב\"ם, דודאי מ\"ש הרמב\"ם ויניח מעט ריוח בתחילת שיטה שניה, היינו דמעט ריוח נמי סגי, ולאו למימרא דאם הניח ריוח הרבה בתחילת שיטה שניה לא הויא סתומה אלא פתוחה, דא\"כ נמצא דגם להרמב\"ם יש פתוחה שמתחלת באמצע שיטה, והרי הרמב\"ם שפתו ברור מללו דאין פתוחה באמצע שיטה לעולם אלא בראש שיטה, דמבואר מדבריו להדיא דאפילו הניח ריוח הרבה בסוף שיטה הראשונה ובתחלת שיטה שניה מכל מקום כשמתחלת באמצע הוי סתומה. וכן מבואר להדיא מדברי הב\"י (והרא\"שכב) בי\"ד סי' ער\"ה לדעת הרמב\"ם, והוא פשוט ומוכרח בירושלמי דאמר, פת[וחה] מכאן ומכאן סתומה, דמשמע אפילו פתחהו הרבה מכאן ומכאן. והתוס'כג והרא\"שכד שתמהו על פירוש זה ופירשו פירוש אחר בירושלמי, היינו לפי גרסתן ברישא, פתוחה מראשה פתוחה ופתוחה מסופה פתוחה, ואהא קשיא להו, דאמאי פתוחה מכאן ומכאן סתומה, דלמה יגרע מפתוחה בראשה לבד. אבל לגרסת הרמב\"ם, פתוחה מראשה סתומה אין מקום לקושייתם, דמאחר שהפתוחה מראשה היא סתומה, כיון שמתחיל לכתוב מאמצע שיטה וסותם מה שלפניו בשיטה זה, הוא הדין נמי שסותם את הריוח שבשיטה שלפניו בסופה. ואף שהריוח הרבה מאוד, אינו מועיל לקרותה בשם פתוחה. ועוד, שכמו שאינו מועיל מעט הריוח שבתחלת שיטה, שהוא נוסף על הריוח שעשה בסוף השיטה כשיעור ובין שניהם יש הרבה יותר מכשיעור ואפילו הכי הוי סתומה, הוא הדין והוא הטעם אם הניח ריוח הרבה, וכמו שלמד הרמב\"ם מהירושלמי דפתוחה מכאן ומכאן סתומה, אם הניח מעט ריוח בתחלת השיטה שניה אעפ\"י שהניח בסוף שיטה הראשונה כשיעור הנ\"ל, יש ללמוד דהוא הדין אם הניח ריוח הרבה בתחילת שיטה שניה, דחד דינא וחד טעמא הוא.</p><p>ומה שיש לומר בישוב המנהג, הוא משום שהתוס' והרא\"ש שתמהו על פירוש זה בירושלמי, לא משום דפתוחה בראשה לחוד הוא דתמהו, אלא אף משום פתוחה בסופה, דס\"ל מאחר שפתוחה מסופה פתוחה, [ב]הא דפתוחה מראשה לא גרעי ולא נפקת מתורת פתוחה מסופה. וכן הוא להדיא בספר התרומה סי' (ר\"ב) [ר']כה, בהא דפליגי סדור הקדמוני עם מסכת סופרים, דמר ס\"ל פתוחה מסופה דווקא, ומר סבר מראשה דווקא, והעושה פתוחה מראשה ומסופה יצא ידי שניהם, מכלל דאף דמאן דס\"ל פתוחה מסופה דווקא, לא גרעי בהכי מה שעשה פתוחה גם בראשה. וכ\"ה להדיא שם. וא\"כ נהי דפתוחה מראשה הנהיגו כדעת הרמב\"ם, מכל מקום פתוחה מסופה דלדידהו הפתוחה שבראשה אינה מוציאה משום פתוחה מסופה חששו לדבריהם, ולא רצו לסמוך על דעת הרמב\"ם בלבד לעשות פתוחה בסופה וגם בראשה, דתרתי לא עבדי לעבור על דברי התוס' והרא\"ש, ובחרו בצורה הראשונה להניח בסוף פרשת שמע פחות מכשיעור דלא מיקרי פתוחה מסופה לכ\"ע אלא פתוחה מראשה בלבד, אלא דלדעת הרא\"ש הוי מכל מקום פתוחה ובהא לחוד סמכו על הרמב\"ם, כנ\"ל.</p><p>מיהו בספר התרומה שם משמע דסברת ר\"ת אינה מוכרחת כל כךכו, דאדרבא פתוחה מסופה ומראשה גרעי טפי מאילו היתה פתוחה במקום אחד מסופה או מראשה, ולכן לא תמה על הירושלמי דאמר פתוחה מכאן ומכאן סתומה, אפילו לגרסת התוס' דגרסי ברישא, פתוחה מראשה פתוחה ומסופה פתוחה, דלאו הא בהא תלייא. אלא דמצד אחר קשיא ליה הירושלמי דרב אדרב, דבגמרא דילןכז למסקנא אמרינן דרב קאי אריוח דווקא ולא אפתוחות דווקא, ובירושלמי איתא דרב אמר הלכה בפתוחות, ולא ניחא ליה למימר כמ\"ש התוס'כח, די\"ל דירושלמי פליג וסבירא ליה כמ\"ד דגמרא דידן, משום דלמסקנא אמרינן דרב אזיל בתר מנהגא, וה\"נ ס\"ל להירושלמי, כמ\"ש הפוסקים בירושלמי פרק הפועליםכט דמנהג מבטל הלכה. והתוס' לא חששו לקושיא זול, ומשום הכי אי לאו דתמה על הירושלמי מצד עצמו, לא היו מפרשים פירוש אחר בירושלמי, והטעם, דאפשר לומר דהירושלמי ס\"ל דהא דרב בהאילא אתמר.</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl3mTUHFsW-16UOD","_score":1.0,"_source":{"title":" ליקוטי תורה\r\n  -  פרשה תצא\r\n  -  לז ג\r\n\r\n","content":"<p>לז ג</p><p>הברכה לפי שכך הוא סדר ההמשכה כנ\"ל. אך ריבוי ההתחכמות בזה הוא מותרי מוחין אשר ע\"ז נאמר לא לחכמים לחם. כי בזה מראה שעולה על דעתו שהסיבה והלבוש ההוא והתחבולה היא עיקרית בהשפעה זו והוא בחי' נפרד כו' (וכמ\"ש בד\"ה שובה ישראל כו' שעי\"ז גורם להיות לו לב האבן כו' ע\"ש) והוא כמשל מי שתופר לו לבוש כמדה הצריך הוא טוב אבל אם מאריך אותו יותר מדאי גורם שיפול מחמתו ח\"ו. (והא דארז\"ל נדה (דף ע') מה יעשה אדם ויתעשר ירבה בסחורה כו' זהו כמש\"ש כשמבקש רחמים מיי שהעושר שלשו על עושר אז ודאי צריך ג\"כ לעשות לבוש וכלי שיוכל לשרות בזה הברכה. וגם זאת רק ירבה בסחורה ולא ריבוי ההתחכמות יותר מדאי וההעמקה דאדרבה לא לחכמים לחם כו' וכ\"ש מי שאינו אץ להתעשר רק מסתפק בהכרחי או אף אם רוצה להתעשר אלא שלא בקש רחמים ע\"ז אז רבוי הסחורה ג\"כ ה\"ל כלבוש ארוך יותר מדאי כו'. אלא דכשמבקש רחמים ע\"ז אז לא סגי בלי שירבה בסחורה כמש\"ש בגמ' דהא בלא הא לא סגי. והיינו מטעם הנ\"ל שההשפעה בעשייה נמשך על ידי לבוש כו' בכל אשר תעשה). וזהו ענין וגלחה את ראשה המותרי מוחין הנ\"ל (שהם נמשלו לבחינת שערות שמהם יניקת החיצונים ע\"ד שער באשה ערוה משא\"כ בתורה כתיב סלסלה ותרוממך כי התורה שרשה מח\"ע וכתר עליון אשר משם ההמשכה דייקא ע\"י בחי' שערות כו'. שאל\"כ לא יוכלו העולמות לקבל כו'. ועיין מ\"ש במ\"א ס\"פ לך לך בד\"ה שרי אשתך והנה למעלה כך היא המדה כו' ע\"י צמצום דוקא כו' משא\"כ למטה בבחי' שרה כו' הוא להיפך ממש כו' וע' בפ' תצוה בד\"ה ועשית בגדי קדש במש\"ש אבל בחי' ורב חסד כו' ודרך גילוי זה והמשכה זו כו' הוא כמ\"ש כשמן ה טוב על ראש יורד על הזקן כו' ע\"ש. וע' בפ' אמור בד\"ה ונקדשתי בתוך כו' ובפרשת נצבים בביאור על פ' כי כארץ תוציא צמחה כו'):</p><p>והסירה את שמלת שביה. שמלה הוא בחי' מקיף ויש מקיף גם בזלעו\"ז כי בבואה דבבואה לית להו אבל בבואה לחודא אית להו (ועיין מזה בפע\"ח בכוונת הושענא רבה אך שם נת' ענין בבואה דבבואה באופן אחר) והיינו כמבואר למעלה שבקדושה יש ב' מקיפים ל' מ' והם בחינת מקיף ומקיף דמקיף והם בחינת חיה יחידה שהם ב' מקיפים ונר\"נ הם פנימים וע' בפי' הרמ\"ז פנחס (דר\"כ סע\"א) גבי העונה אמן יהא שמיה רבא מברך בכל כחו ועמ\"ש בביאור על פ' כי כאשר השמים החדשים. ובקליפה אין להם בחי' בבואה דבבואה שהוא בחי' המקיף למקיף. וז\"ש ומכפירים יחידתי שהוא יחדה ממש שאין לה לעומת זה בקליפות. אבל בחי' בבואה לחודא היינו מקיף א' יש להם (ובזה יתורץ איזה דרושים הסותרים לכאורה זא\"ז דבמ\"א נת' דבחי' אהבה רבה אין כנגדה לעומת זה כמ\"ש ע\"פ חכלילי עינים כו' ובמ,א נת' שכמו כן בקליפה יש מבחי' הרצון שלמעלה מהשכל שהוא עומק ההתקשרות בהבלי העולם כו' וכמ\"ש בד\"ה ושמתי כדכד כו' בעין ומכפירים יחידתי. ולפמש\"כ א\"ש דבחי' מקיף א' יש להם ובחי' מקיף היינו מה שלמעלה מהשכל. אך בחי' מקיף השני שהוא עיקר בחי' המקיף עליון בחי' יחידה ממש והוא נקרא תעלומות לב לית להו רק בקדושה יש בחי' זו כו') והיינו בחי' למ\"ד והוא ענין עבירה גוררת עבירה וענין אדם מטמא עצמו מעט מטמאין אותו הרבה (עיין בר\"ח פ' ד' משער הקדושה) והיינו מה שאינו מרגיש בנפשו שזה נמשך לו מבחי' המקיף דקליפה. וזהו ענין והסירה את שמלת שביה שצ\"ל הסרת המקיף דקליפה בכדי שישרה המקיף דקדושה בחי' למ\"ד כנ\"ל:</p><p>וישבה בביתך. בקביעות שתתיישב היטב בנפש בל תמוט לעולם</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl3zTUHFsW-16UOE","_score":1.0,"_source":{"title":" כתר שם טוב\r\n  -  חלק שני\r\n  -  תיט-ב\r\n\r\n","content":"<p>תיט-ב</p><p>הצופה העולה על המגדל כשרואה איזה דבר אז תוקע בשופר, ואתה עלית על המגדל של בית הכנסת, האם אתה רואה כל המסטינים הסובבים הכסא שאתה תוקע, כמו שהיו הראשונים רואים לזמר עריצים להכרית החוחים כו'. ע\"כ נק' יום תרועה, לשון מוקש אתרעא, כעני בפתח דופק פתחי לי שערי צדק, פתח לנו שערי רחמים כי בידך מפתח שערי רחמים, זה השער לה' צדיקים יבואו בו.</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl4JTUHFsW-16UOF","_score":1.0,"_source":{"title":" ליקוטי תורה\r\n  -  פרשה ויקרא\r\n  -  ו ד\r\n\r\n","content":"<p>ו ד</p><p>שמואל. דר\"ל מעוני הדעת. סופו לקיימה מעושר הדעת שהוא ישפיע עליו מחכמתו כו' וזהו אם אין יראה אין חכמה אם אין חכמה אין יראה, וא\"כ איך יתחיל. אלא כי יש ב' בחי' יראה הא' יראה תתאה והיא תרעא לאעלאה, ולכן אם אין יראה אין חכמה. ואח\"כ ע\"י החכמה יזכה ליראה עילאה כו' ששם אין שייך חמוץ כו'. וזהו שאמרו יאה עניותא לישראל. ור\"ל שיהיה בעיניו נגד הקב\"ה בבחי' עני מן הדעת ולהיות בבחי' אמונה. וכמ\"ש בסש\"ב ח\"א פרק י\"ח דכתיב פתי יאמין לכל דבר ואצל הקב\"ה הכל כפתיים, וכמ\"ש בהמות הייתי עמך וכתיב אדם ובהמה תושיע הוי' וארז\"ל פ\"ק דחולין דף ה' ע\"ב אלו בני אדם שהם ערומים בדעת כאדם הראשון ומשימים עצמם כבהמה דכאי רוח ע\"ש בפרש\"י כו' וכ\"כ ברבות פ' בשלח פכ\"א ע\"פ יונתי אמר הקב\"ה אצלי הם כיונה פותה כל מה שאני גוזר עליהם עושים כו'. וע\"כ בענין חיוב אכילת מצה שהוא תחלת העבודה צ\"ל לחם עוני דוקא שהוא בחי' אמונה ואתכפיא בלי שום טעם ודעת. וע\"כ אין ליתן בה מלח. שהמלח הוא נותן טעם להיות בחי' טעם ודעת שהוא גילוי פנימית התורה כו'. וראשית העבודה צ\"ל בבחי' לחם עוני דוקא. ולכן ישראל מונין ללבנה, אלא שאח\"כ צריך להיות בה המשכת הדעת מבחינת שמשא וזהו עניןמצה עשירה, ועמ\"ש בפי' רבת תעשרנה פלג אלקים בד\"ה והיה מספר בנ\"י כחול הים כו' ואזי מבחי' דל\"ת נעשית ה' ועמ\"ש בזה סד\"ה המגביהי לשבת כו':</p><p>ט וביאור הענין יש להקדים מ\"ש באו\"ת פ' קרח בשם הה\"מ נ\"ע וז\"ל והנה נאמר באהרן ברית מלח עולם הוא. הוא כתיב והקרי היא. והנה ידוע שאהרן שושבינא דמטרוניתא והוא המקשר עולמות ע\"י עבודת הקרבנות והקטורת שהוא לשון קשר. כי תרגום ותקשור על ידו בפ' וישב וקטרת על ידיה. וזהו פי' ברית מלח לשון עירוב כמו המלחים. היינו כדפרש\"י בחומש פ' כי תשא ע\"פ ממולח טהור קדש מעורב שיערב יפה יפה ואומר אני שדומה לו וייראו המלחים כו' שמהפכין כו' ע\"ש. ופי' ברית מלח שכרת לו ברית שע\"י עבודת הקרבנות יקשר ויערב העולם שהם כלל העולמות בא\"ס שהוא יהיה הממוצע והמחבר והמקשר העולמות זה בזה כו' וזהו עלה בכבש כו'. עד מערבית שהוא מדת אהרן ברית מלח שמערב העולמות כו', והנה הכתיב ברית מלח עולם הוא והקרי היא כי למעלה הוא בהעלם גדול לכך כתיב הוא לשון נסתר אבל למטה כאשר בא תוך הקרי שהוא הדבור ושם הוא התגלות לכן נק' היא עכ\"ל, וזהו שבקטורת נאמר ממולח כי הקטרת הוא ענין הקשר והעירוב כו'. וביאור ענין שמערב העולמות, כי הנה ארז\"ל ביום חתונתו זו מתן תורה, וצ\"ל מהו פי' חתונתו, אך כי חיתון פירושו תערובות כמ\"ש בת\"י פ' עקב ז' ג'. וא\"כ פי' ביום חתונתו היינו ענין תערובות והתקשרות העולם בא\"ס ב\"ה ע\"י התורה, והוא ע\"פ מ\"ש ברבות פ' וארא פי\"ב ע\"פ כל אשר חפץ ה' עשה אמר דוד אע\"פ שגזר הקב\"ה השמים שמים לה' כו' כשבקש ליתן התורה בטל גזירה ראשונה ואמר התחתונים יעלו לעליונים והעליונים ירדו לתחתונים ואני המתחיל שנאמר וירד ה' על הר סיני. וכתיב ואל משה אמר עלה אל ה' הוי כל אשר חפץ ה' עשה בשמים ובארץ עכ\"ל. ופי' ענין ירידה ועלייה יובן ממ\"ש במ\"א בד\"ה ושמתי כדכד שמשותיך כדין וכדין כו' ועכ\"פ הוא השתלשלות והמשכת האור מסוכ\"ע בממכ\"ע וזהו כי כל בשמים ובארץ דאחיד בשמיא וארעא כו' וזהו ענין ברית מלח עולם. והנה פי' ליל שמורים הוא ע\"ד שמור לנוקבא היינו מה שהמקבל ממתין ומצפה ומייחל אל המשפיע כעני הצופה ומביט מתי יתן הבעה\"ב</p>"}},{"_index":"chabadlibrary","_type":"book","_id":"AVFjvl4gTUHFsW-16UOG","_score":1.0,"_source":{"title":" ליקוטי תורה\r\n  -  שיר השירים\r\n  -  כב ב\r\n\r\n","content":"<p>כב ב</p><p>היינו עטרה שעטרה לו אמו דבאתעדל\"ת תליא מלתא. והנה הנשמות שבג\"ע יש מהן שנקראו בנות ירושלים. ויש מהן שנקראו בנות ציון. בנות ירושלים הן הנשמות שעדיין לא נתלבשו בגופות בנ\"א שמקבלות יראה שלם דהיינו שלימות היראה שהיא בבחי' א\"ס מה שאין המלאכים עליונים יכולים לקבל כ\"א כפי מה שנמשך להם במדה לכל א' וא' לפי מדרגתו. משא\"כ יתר מכדי מדתן ארז\"ל הושיט הקב\"ה אצבעו הקטנה ביניהם ושרפן שנתבטלו במציאות לפי שהושיט אצבעו הקטנה יתר מכדי מדתם הראויה להם לפי שהם נתלבשו בבחי' גופות מיסוד האש ויסוד הרוח וכמ\"ש עושה מלאכיו רוחות משרתיו אש לוהט. אבל הנשמות שעדיין לא נתלבשו בגופות יכולות לקבל אור א\"ס ב\"ה כמו שהוא בבחי' א\"ס וכמ\"ש חי ה' אשר עמדתי לפניו לפי שהן כלולות ומיוחדות במאצילן ב\"ה ממש (וכמ\"ש מזה לעיל בד\"ה שחורה אני כו') ובנות ציון נק' הנשמות שבגן עדן שבאו מעוה\"ז כי ציון מלשון ת\"ח שבבבל מצוינים. פי' מלובשים שנעשה להם בחי' לבושים מעסק התורה והמצות אשרי מי שבא לכאן ותלמודו בידו כדי שיוכלו ליהנות מזיו השכינה כמו שא\"א להסתכל באור גדול בלי כלי ולכן כל הנביאים ואפילו משה רבינו ע\"ה ראה באספקלריא אלא שמרע\"ה ראה באספקלריא אחת המאירה ושאר הנביאים דרך ז' אספקלריאות. וזהו ימים יוצרו ולא אחד בהם ולו קרי כי ימים הם לבושים והם יוצרו בכדי שיהי' בחי' אחד מאיר בהם. אך לבוש זה אינו אלא ליהנות מזיו בבחי' ההשגה הנפלאה שהוא בחי' חכמה כי חכמת אדם תאיר פניו ובאור פניך נתת לנו תורת חיים שהתורה היא בחינת אור פניו ית' שנהנין מזיו זה הצדיקים בג\"ע והוא זיו התורה והמצות אבל בעטרה שעטרה לו אמו הן הם התורה והמצות עצמן שהן למעלה מעלה מבחינת חכמה שממדבר מתנה בחי' מדבר אשר לא ישב אדם שם ולא ניתן ליהנות לבני אדם בהשגתם והשכלתם כלל. הנה ע\"ז נאמר צאינה וראינה. כלומר צאינה מן הלבושים כי אין צורך ללבוש שאין הלבוש אלא כדי להיות כח לקבל ההשגה הגדולה והנפלאה. אבל בעטרה אין כח ההשגה מגעת לשם כי היא למעלה מעלה מכח ההשגה והחכמה כנ\"ל (ובזהר נז' מענין צאינה וראינה בפ' תרומה קל\"ד א' וברבות ס\"פ פקודי פ' אחרי ספ\"ך במדבר ספ\"ב פי\"ב דרמ\"ח ג' ובשה\"ש רבה ע\"פ צאינה וראינה):</p><p>להבין ענין הטעם למה שהאתדל\"ע הבאה אחר האתעדל\"ת והוא מ\"ש ואשה כי תזריע תחלה אזי וילדה זכר שהיא בחי' האהבה רבה בנשמו' מי לי בשמים כו' שלא ע\"מ לקבל פרס כו' משא\"כ התעוררות האהבה בנשמות הבאה מבחי' אתעדל\"ע שמאליו מלמעלה למטה שלא ע\"י אתעדל\"ת בתחלה והוא הנק' איש מזריע תחלה אזי אינו אלא וילדה נקבה שהוא בחי' אהבה זוטא ע\"ד נשים דעתן קלות שהוא האהבה על מנת לקבל פרס לדבקה בו וליהנות מזיו כו' בבחי' לגרמיה כו' וכמבואר כ\"ז בפ' תזריע בד\"ה שוש תשיש. וגם להבין הטעם למש\"ל בפי' צאינה וראינה בנות ציון כו' בעטרה שלראות בעטרה שעטרה לו אמו שהוא בחי' כתר אין צריך ללבושים משא\"כ השגות הנשמות בג\"ע טעמי התורה שהוא בחי' חכמה הוא דוקא ע\"י הלבושים דלכאורה כלפי לייא הרי העטרה והכתר הוא בחי' גבוה יותר הרבה וא\"כ אם בהתגלות הזיו א\"א בלי לבוש (ועמ\"ש מענין לבושים אלו ע\"פ ואברהם זקן בא בימים ובד\"ה ועשית בגדי קדש) שבו ועל ידו יושג הזיו כמו שא\"א לראות אור גדול אלא ע\"י הפסק זכוכית עד\"מ. איך בהתגלות הכתר נאמר צאינה מהלבושים וראינה בעטרה כו'. ויובן זה ע\"ד המבואר בע\"ח בענין כללות ירידת החיות והמשכת השפע מאור א\"ס ב\"ה בכללות כל ההשתלשלות בכלל שיש ב' מיני השפעה. הא' הוא הבא ונמשך תמיד מלמעלה למטה</p>"}}]}}

// 	// returns the current list of phones
// 	$httpBackend.whenGET('/search').respond(searchResponse);

// 	$httpBackend.whenGET(/^\/templates\//).passThrough();

// });