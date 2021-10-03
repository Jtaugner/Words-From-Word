<template>
	<div id="app">
		<!--    <div class="close-level-help prev-location next-location"></div>-->
		<div class="levels"
			 @updateAll="updateAll()"
			 @canShowAdv="setCanShowAdv()"
			 @buyTips="addBuyTips()"
			 v-show="levels" :class="[levelsAnim ? 'levelsAnim' : '']">

<!--			<div class="blur"></div>-->


			<div class="levelsTop">
				<div class="switchSettings menuItem" @click="toggleSettings"></div>

				<div class="levelsTop__allStars" :class="[notRussian ? 'levelsTop__allStars_withoutLB' : '']">
					{{allStars}}/{{ (location+1)*63}}
<!--					<div class="menu-star"></div>-->
				</div>

				<div>
					<div class="leaderBoard menuItem" @click="toggleLeaderBoard()" v-if="!notRussian"></div>
					<div class="switchShop menuItem" @click="toggleShop()"></div>
				</div>





			</div>



			<div class="levels__property">
				<div class="levels-wrapper" :class="{'levels-wrapper_bigLevels': location >= 47}">
					<div
						class="level"
						v-for="level in 21"
						:key="getLevelByLevelAndLocation(level)"
						@click="getLevel(getLevelByLevelAndLocation(level)-1)"
						:class="{'level-done': isLevelDone(getLevelByLevelAndLocation(level)),
                            'level_close': isCloseLevelShow(getLevelByLevelAndLocation(level))
                            }">




						<div :class="getLevelByLevelAndLocation(level) > 99 ? 'level__big' : ''">
							{{getLevelByLevelAndLocation(level)}}</div>
						<div class="menu__level_stars">
							<div class="level_star" v-for="star in 3" :key="star"
								 :class="star <= stars[getLevelByLevelAndLocation(level)-1] ? 'menu-star' : ''"></div>
						</div>
					</div>

					<div class="prev-location" @click="prevLocation()" v-if="location > 0"></div>
					<div class="next-location" @click="nextLocation()" v-if="location < allLocations-1 && showNextLoc"></div>

					<div class="levels__loc" :class="[location > 98 ? 'levels__loc_big' : '']">{{location+1}}</div>
				</div>



			</div>









		</div>

		<div class="rules-blackout" v-show="isLeaderBoard" @click="toggleLeaderBoard()"></div>

		<div class="rules shop rules_lb" v-show="isLeaderBoard">
			<div class="rules__cross shop__cross" @click="toggleLeaderBoard()"></div>
			<h2 class="rules__menu black-friday">
				{{notRussian ? 'Rating' : 'Рейтинг'}}
			</h2>
			<div class="leaderBoardInfo">
				<template v-if="leaderBoard">
					<div
						class="leaderBoardInfo__player"
						v-for="player in leaderBoard"
						:class="['leaderBoardInfo_' + player.rank, playerRait && playerRait.rank === player.rank ? 'leaderBoardInfo_my' : '', player.rank === 20 ? 'lastRang' : '']"
					>
						<div class="leaderBoardInfo__playerInfo">
							<div class="leaderBoardInfo__rank">{{ player.rank }}</div>
							<div class="leaderBoardInfo__image"
								 :style="{background: 'url(' + player.player.getAvatarSrc('medium') + ') center center no-repeat'}"
								 :class="[player.player.getAvatarSrc('medium') ? '' : 'leaderBoardInfo__image_no']"></div>
							<div class="leaderBoardInfo__name">{{ player.player.publicName ? player.player.publicName : 'Нет имени' }}</div>
						</div>

						<div class="leaderBoardInfo__score">{{ player.score }}</div>
					</div>



					<!--            <template v-if="playerRait && playerRait.rank > 10">-->
					<!--              -->
					<!--              <div class="leaderBoardInfo__player leaderBoardInfo_my">-->
					<!--                <div class="leaderBoardInfo__playerInfo">-->
					<!--                  <div class="leaderBoardInfo__rank">{{playerRait.rank}}</div>-->
					<!--                  <div class="leaderBoardInfo__image"-->
					<!--                       :style="{background: 'url(' + playerRait.player.getAvatarSrc('medium') + ') center center no-repeat'}" :class="[playerRait.player.getAvatarSrc('medium') ? '' : 'leaderBoardInfo__image_no']"></div>-->
					<!--                  <div class="leaderBoardInfo__name">{{playerRait.player.publicName}}</div>-->
					<!--                </div>-->


					<!--                <div class="leaderBoardInfo__score">{{playerRait.score}}</div>-->
					<!--              </div>-->

					<!--            </template>-->

				</template>


				<template v-else>
					<div class="settings__text authText" @click="getAuth">
						{{notRussian ? 'Log in to your Yandex account to see the rating' : 'Чтобы увидеть рейтинг, пожалуйста, войдите в аккаунт Яндекс'}}

					</div>
				</template>

			</div>

		</div>


		<div class="game" v-show="content">
<!--			<div class="blur"></div>-->

			<header class="menu" :class="[isTutorial ? 'tutorialMenu' : '']">
				<button class="menu__button-back menuItem" @click="backMenu"></button>
				<div class="menu__words-amount">
					{{doneWords.length}}/{{nowWords.length}}
					<div class="menu__hint">{{notRussian ? 'Guessed' : 'Отгадано'}}</div>
				</div>
				<div class="menu__level">
					{{notRussian ? 'Level' : 'Уровень'}} {{lvl+1}}
					<div class="menu__level_stars">
						<div class="level_star" v-for="star in 3" :key="star"
							 :class="[star <= stars[lvl] ? 'level_full-star' : '',
                      getStar === star ? 'getStar' : '']"></div>
					</div>
				</div>
				<div class="menu__tip menuItem" @click="getTip()" :class="[selectTip ? 'tutorialSelected' : '']">
					<div class="advert" v-if="canShowAdv && tipCount === 0"></div>
					<div class="menu__tip_count" v-else>{{tipCount}}</div>
				</div>
				<div class="menu__button-next-level menuItem"
					 :class="[testShowNextLevel() ? 'menu__button-next-level_active' : '']"
					 @click="nextLevel()">
					<div class="menu__hint" v-if="lvl < 4">{{notRussian ? 'Earn 1 star and get access to the next level' : 'Заработайте 1 звезду и получите доступ к следующему уровню'}}</div>
				</div>
			</header>



			<div class="property">
				<div></div>






				<div class="words">
					<div class="words__letters-block"
						 v-for="(word,index) in nowWords"
						 :key = "word"
						 :class="[doneWords.includes(word) ? 'words__letters-block_done' : '',
               animWord === word ? 'animWord' : '',
                animWordStart === word ? 'animWordStart' : '',
                newWord === word ? 'newWord' : '',
                wordWasIndex === index ? 'wordWas': '',
                selectMainWord === word ? 'tutorialSelected' : ''
                ]"
						 @click="openWordDescription(word)"
					>
						<div class="words__letter"
							 v-for="(letter, ind) in word" :key = "word + ind + letter"
						>{{doneWords.includes(word) ? letter : '' }}</div>
					</div>

				</div>





				<div class="action-block">
					<div class="action-block__done-word">
						<div class="done-word" :class="[isBadWord ? 'badWord' : '']" >{{wordFromLetter}}</div>
					</div>
					<div class="action-block__letters">
						<div class="action-block__letter"
							 @click="selectLetter(index)"
							 :class="[selectedLetters.includes(index) ?'action-block__letter_selected' : '', tutorialSelected === index ? 'tutorialSelected' : '']"
							 v-for="(letter,index) in letters" :key="letter + Math.random()">{{letter}}
						</div>
						<button class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord"></button>
					</div>
				</div>


				<div class="cloudHint" v-show="cloudHint && !showWordDesc" :class="[selectMainWord ? 'cloudHint_wordSelected' : '']">
					<p v-html="cloudsPhrase"></p>
				</div>
				<div class="skipTutorial" v-show="cloudHint && !showWordDesc && canShowSkip" @click="endTutorial">Пропустить</div>


			</div>









			<!--      <div class="rules-blackout" v-show="showAdvTip" @click="closeShowAdvTip()"></div>-->
			<!--      <div class="rules adv-show" v-show="showAdvTip">-->
			<!--        <div class="rules__cross" @click="closeShowAdvTip()"></div>-->
			<!--        <h2 class="rules__menu">-->
			<!--          Внимание-->
			<!--        </h2>-->
			<!--        Для получения подсказки нужно посмотреть рекламу не менее 3 секунд.-->
			<!--        <span v-show="isAdvShowed">Но в первый раз вы её получаете.</span>-->
			<!--      </div>-->

			<div class="rules-blackout cloudHintBackground" v-show="cloudHint" @click="closeHint()"></div>



			<div class="rules-blackout" v-show="showWordDesc" @click="toggleShowWordDesc"></div>

			<div class="rules shop word-mean" v-show="showWordDesc">
				<div class="rules__cross shop__cross" @click="toggleShowWordDesc"></div>
				<h2 class="rules__menu">
					{{notRussian ? 'Definition' : 'Определение слова'}}
				</h2>
				<div class="word-definition">
					{{notRussian ? 'Definition - loading...' : 'Определение слова - загрузка...'}}
				</div>

			</div>


			<div class="rules-blackout main-blackout" v-if="showLastLevelInfo && !notRussian" @click="toggleShowLastLevelInfo()"></div>
			<div class="rules rules__notification" v-if="showLastLevelInfo && !notRussian">
				<div class="rules__cross" @click="toggleShowLastLevelInfo()"></div>
				<h2 class="rules__menu">
					{{wasUpdate ? 'Уважаемые игроки!' : 'Дорогой игрок!'}}
				</h2>
				<template v-if="wasUpdate">
					Мы немного обновляем дизайн игры. Надеемся, он вам понравится! Также в скором времени появится возможность сменить фон и оформление игры!
				</template>
				<template v-else>
					Поздравляем! Вы прошли все уровни игры! Но не отчаивайтесь, скоро обязательно появятся новые. Мы обновляем словарь несколько раз в месяц, и добавляем новые уровни каждый месяц.
					Вы можете пройти все старые уровни на 3 звезды или же подождать, когда выйдут новые уровни. Про обновления вы можете узнать в
					<a href="https://vk.com/jaugr"
					   target="_blank"
					   rel="noopener noreferrer"
					   class="settings__text"
					   @click="()=>{sendParams({'vk-lastLevel': 1})}"
					>
						группе ВКонтакте
					</a>.
				</template>

			</div>

		</div>



		<div class="rules-blackout" v-show="shop" @click="toggleShop()"></div>

		<div class="rules shop mainShop" v-show="shop">
			<div class="rules__cross shop__cross" @click="toggleShop()"></div>
			<h2 class="rules__menu black-friday">
				{{notRussian ? 'Shop' : 'Магазин'}}
			</h2>
			<div class="shop__cart">


				<div class="shop__cart__item" @click="buyTip(2)">
					<div class="shop__cart__item_2">
					</div>
					<div class="shop__cart__name">{{notRussian ? '20 hints' : '20 подсказок'}}</div>
					<div class="shop__cart__buy-button" >
						{{getItemPrice(0)}}
					</div>
				</div>


				<div class="shop__cart__item" @click="buyTip(3)">
					<div class="shop__cart__item_3">
					</div>
					<div class="shop__cart__name">{{notRussian ? '50 hints' : '50 подсказок'}}</div>
					<div class="shop__cart__buy-button">
						{{getItemPrice(1)}}
					</div>
				</div>


				<div class="shop__cart__item" @click="buyTip(4)">
					<div class="shop__cart__item_4">
					</div>
					<div class="shop__cart__name">{{notRussian ? '100 hints' : '100 подсказок'}}</div>
					<div class="shop__cart__buy-button">
						{{getItemPrice(2)}}
					</div>
				</div>



			</div>

		</div>

		<div class="rules-blackout main-blackout" v-if="purchaseCompleted" @click="togglePurchaseCompleted()"></div>

		<div class="rules rules__notification" v-if="purchaseCompleted">
			<div class="rules__cross" @click="togglePurchaseCompleted()"></div>
			<h2 class="rules__menu">
				{{notRussian ? 'Successful purchase' : 'Покупка совершена'}}
			</h2>
			{{notRussian ? 'Hints are credited to your account. Thank you for your purchase! Have a good game!' : 'Вы успешно купили подсказки, они уже зачислены на ваш счёт! Большое спасибо за покупку и удачной Вам игры!'}}
		</div>



		<div
			class="blackout rules-blackout"
			@click="toggleSettings"
			v-show="isSettings"

		></div>

		<div class="settings" v-show="isSettings">
			<div class="settings__header">{{notRussian ? 'Settings' : 'Настройки'}}</div>
			<ul>
				<li>
					<input type="checkbox"
						   @change="switchSounds"
						   v-model="isSounds"
						   id="musicCheckbox"
						   class="checkbox"

					/>
					<label
						for="musicCheckbox">
						{{notRussian ? 'Sounds' : 'Звуки'}}
					</label>
				</li>


				<li>
          <span
			  class="settings__text"
			  @click="toggleRules"
		  >
            {{notRussian ? 'Rules' : 'Как играть?'}}

          </span>
				</li>


				<template v-if="!notRussian">
					<li>
						<a href="https://vk.com/jaugr"
						   target="_blank"
						   rel="noopener noreferrer"
						   class="settings__text"
						   @click="()=>{sendParams({'vk': 1})}"
						>
							Группа ВКонтакте
						</a>
					</li>

					<li class='our-games'>
						Наши игры
					</li>

					<li @click="()=>{sendParams({'crs': 1})}">
						<a href="https://yandex.ru/games/play/100008"
						   target="_blank"
						   rel="noopener noreferrer"
						>
							<div class="my-game crs">
							</div>
						</a>
					</li>

					<li @click="()=>{sendParams({'stm': 1})}">
						<a href="https://yandex.ru/games/play/98125"
						   target="_blank"
						   rel="noopener noreferrer"
						>
							<div class="my-game stm">
							</div>
						</a>
					</li>

					<li @click="()=>{sendParams({'wfl': 1})}">
						<a href="https://yandex.ru/games/play/99196"
						   target="_blank"
						   rel="noopener noreferrer"
						>
							<div class="my-game wfl">
							</div>
						</a>
					</li>
				</template>


			</ul>
		</div>


		<!--    <div class="rules-blackout main-blackout" v-show="gameUpdate" @click="toggleGameUpdate()"></div>-->
		<!--    <div class="rules" v-show="gameUpdate">-->
		<!--      <div class="rules__cross" @click="toggleGameUpdate()"></div>-->
		<!--      <h2 class="rules__menu">-->
		<!--        Обновление-->
		<!--      </h2>-->
		<!--      С сегодняшнего дня словарь получил большое обновление слов, а также появилась возможность узнать значение слова - для этого нажмите на него.-->
		<!--      Удачной игры!-->
		<!--    </div>-->

		<div class="rules-blackout main-blackout" v-show="rules" @click="toggleRules()"></div>
		<div class="rules" v-show="rules">
			<div class="rules__cross" @click="toggleRules()"></div>
			<h2 class="rules__menu">
				{{notRussian ? 'Rules' : 'Правила'}}
			</h2>
			<div class="rules__text">
				<p>
					{{notRussian ?
					'Welcome to the game "Words from Words"! You are given the word. Create as many different words as possible from its letters. You can create only common nouns.' :
					'Добро пожаловать в игру "Слова из слова"! Цель игры - составлять всевозможные слова из выданных вам слов. Создавать можно только нарицательные существительные в единственном числе. Нажмите на букву внизу, чтобы добавить или убрать эту букву из слова. Когда слово будет набрано - нажмите на стрелку.'
					}}

				</p>
				<img v-bind:src="!notRussian ? 'rules1.png' : 'rules1EN.png'" alt="Пример слова">
				<p>
					{{notRussian ?
					'Use hints to add words that you can\'t find. Hints can be obtained by earning stars. Level progress is 33% - 1 star, 66% - 2 stars, 100% -3 stars. Get at least 1 star and click on the arrow in the upper right corner to go to the next level.' :
					'Если у вас закончились идеи, используйте подсказку (она нарисована как лампочка). Подсказки можно получить за звёзды. Уровень пройден на 33% - 1 звезда, 66% - 2 звезды, 100% - 3 звезды. Чтобы перейти на следующий уровень, получите хотя бы 1 звезду и нажмите на стрелку в правом верхнем углу.'
					}}

				</p>
				<img v-bind:src="!notRussian ? 'rules2.png' : 'rules2EN.png'" alt="Подсказка">
				{{notRussian ?
				'Click on a word to get its definition.' :
				'Нажатие на слово позволит вам узнать его значение. Словарь игры постоянно пополняется. Если вы обнаружили лишнее или недостающее слово, пожалуйста, сообщите нам в'
				}}
				<a href="https://vk.com/jaugr"  v-if="!notRussian" target="_blank" rel="noopener noreferrer" class="settings__text" @click="()=>{sendParams({'vk-fromRules': 1})}"
				>
					группу ВКонтакте.
				</a>
				{{notRussian ? 'We also inform you that the game is still under development. Have a good game!' : 'Удачной игры!'}}

			</div>

		</div>




	</div>


</template>


<script>
import {allWordsRU, dictionaryRU} from './russianWords'
import {wordsFromWordsRU} from "./russianWordsFromWords";
import {allWordsEN} from './englishWords'
import {wordsFromWordsEN} from './englishWordsFromWords'
import {getBusinessEvent} from "@/gameAnalytics";
var wordsFromWords = wordsFromWordsRU,
	allWords = allWordsRU,
	dictionary = dictionaryRU;

let advTime = false;
setTimeout(()=>{
	advTime = true;
}, 30000);
let showAdv, playerGame, payments, YSDK;



//Компрессор
var LZString = function () {
	function o(o, r) {
		if (!t[o]) {
			t[o] = {};
			for (var n = 0; n < o.length; n++) t[o][o.charAt(n)] = n
		}
		return t[o][r]
	}

	var r = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = {
			compressToBase64: function (o) {
				if (null == o) return "";
				var r = i._compress(o, 6, function (o) {
					return n.charAt(o)
				});
				switch (r.length % 4) {
					default:
					case 0:
						return r;
					case 1:
						return r + "===";
					case 2:
						return r + "==";
					case 3:
						return r + "="
				}
			}, decompressFromBase64: function (r) {
				return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
					return o(n, r.charAt(e))
				})
			}, compressToUTF16: function (o) {
				return null == o ? "" : i._compress(o, 15, function (o) {
					return r(o + 32)
				}) + " "
			}, decompressFromUTF16: function (o) {
				return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
					return o.charCodeAt(r) - 32
				})
			}, compressToUint8Array: function (o) {
				for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
					var s = r.charCodeAt(e);
					n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256
				}
				return n
			}, decompressFromUint8Array: function (o) {
				if (null === o || void 0 === o) return i.decompress(o);
				for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) n[e] = 256 * o[2 * e] + o[2 * e + 1];
				var s = [];
				return n.forEach(function (o) {
					s.push(r(o))
				}), i.decompress(s.join(""))
			}, compressToEncodedURIComponent: function (o) {
				return null == o ? "" : i._compress(o, 6, function (o) {
					return e.charAt(o)
				})
			}, decompressFromEncodedURIComponent: function (r) {
				return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
					return o(e, r.charAt(n))
				}))
			}, compress: function (o) {
				return i._compress(o, 16, function (o) {
					return r(o)
				})
			}, _compress: function (o, r, n) {
				if (null == o) return "";
				var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0;
				for (i = 0; i < o.length; i += 1) if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else {
					if (Object.prototype.hasOwnProperty.call(p, a)) {
						if (a.charCodeAt(0) < 256) {
							for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
							for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						} else {
							for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
							for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						}
						l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
					} else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
					l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u)
				}
				if ("" !== a) {
					if (Object.prototype.hasOwnProperty.call(p, a)) {
						if (a.charCodeAt(0) < 256) {
							for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
							for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						} else {
							for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
							for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
						}
						l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
					} else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
					l--, 0 == l && (l = Math.pow(2, h), h++)
				}
				for (t = 2, e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
				for (; ;) {
					if (m <<= 1, v == r - 1) {
						d.push(n(m));
						break
					}
					v++
				}
				return d.join("")
			}, decompress: function (o) {
				return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
					return o.charCodeAt(r)
				})
			}, _decompress: function (o, n, e) {
				var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [], A = {val: e(0), position: n, index: 1};
				for (i = 0; 3 > i; i += 1) f[i] = i;
				for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
				switch (t = p) {
					case 0:
						for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
						l = r(p);
						break;
					case 1:
						for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
						l = r(p);
						break;
					case 2:
						return ""
				}
				for (f[3] = l, s = l, w.push(l); ;) {
					if (A.index > o) return "";
					for (p = 0, c = Math.pow(2, m), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
					switch (l = p) {
						case 0:
							for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
							f[d++] = r(p), l = d - 1, h--;
							break;
						case 1:
							for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
							f[d++] = r(p), l = d - 1, h--;
							break;
						case 2:
							return w.join("")
					}
					if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else {
						if (l !== d) return null;
						v = s + s.charAt(0)
					}
					w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++)
				}
			}
		};
	return i
}();

function replaceLevelsToOne(data){
	let keys = Object.keys(data);
	const newData = {};
	keys.forEach((key)=>{
		try{
			if(data[key].length === wordsFromWords[key].length){
				newData[key] = 1;
			}else{
				newData[key] = data[key].slice();
			}
		}catch(ignored){}
	});
	return newData;
}

function compressDataObj(wordsFromWords){
	try{
		const newData = {};
		const doneLevels = [];
		Object.keys(wordsFromWords).forEach(el => {
			let lvl = allWords.indexOf(el);
			if(wordsFromWords[el] === 1){
				doneLevels.push(lvl);
				return;
			}
			wordsFromWords[el].forEach(w => {
				if(newData[w]){
					newData[w].push(lvl);
				}else{
					newData[w] = [lvl];
				}
			})
		});
		newData.doneLevels = doneLevels;
		return newData;
	}catch(e){
		return wordsFromWords;
	}

}
function decompressDataObj(compressedWords){
	const data = {};
	const dl = compressedWords.doneLevels;
	if(dl){
		for(let i = 0; i < dl.length; i++){
			data[ allWords[dl[i]] ] = 1;
		}
	}
	console.log(dl);
	console.log(data);
	const midData = {};
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels') return;

		compressedWords[el].forEach(l => {
			if(midData[l]){
				midData[l].push(el);
			}else{
				midData[l] = [el];
			}
		})
	});
	Object.keys(midData).forEach(el => {
		data[allWords[el]] = midData[el];
	})

	// for(let i = 0; i < allWords.length; i++){
	//   if(data[allWords[i]] === undefined){
	//     data[allWords[i]] = [];
	//   }
	// }

	console.log(data);

	return data;
}

function compressData(data){
	//Если заполнены все слова, уровень - 1
	if(data === null || data === undefined) return;

	let newData =  replaceLevelsToOne(data);
	newData = compressDataObj(newData);
	newData = newCompress(newData);
	return newData;
	// console.log(newData);
	// return LZString.compressToUTF16(JSON.stringify(newData));
}
function decompressData(data){
	let newData = data;
	if(typeof newData === "string"){
		newData = JSON.parse(LZString.decompressFromUTF16(data));
	}
	console.log('decompress');


	if(newData.doneLevels !== undefined){
		console.log('doneLevels');

		if(newData.newCompress){
			console.log('newCompress');
			newData = newDecompress(newData);
		}
		console.log(newData.doneLevels);
		newData = decompressDataObj(newData);
	}
	console.log(newData);
	return newData;
}

function findMaxInArr(arr){
	let max = 0;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > max) max = arr[i];
	}
	return max;
}
//Сохраняем только последний уровень, на котором есть данное слово
function newCompress(compressedWords){
	let data = {};
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels') return;
		data[el] = findMaxInArr(compressedWords[el]);
	});
	data.doneLevels = compressedWords.doneLevels;
	data.newCompress = true;
	data.notStringed = true;
	return data;
}

function newDecompress(compressedWords){
	Object.keys(compressedWords).forEach(el => {
		if(el === 'doneLevels' || el === 'notStringed' || el === 'newCompress') return;
		let lastLevel = compressedWords[el];
		let newArr = [];
		for(let i = 0; i <= lastLevel; i++){
			if(compressedWords.doneLevels.includes(i)) continue;
			//i - уровень. Если слово есть на уровне, добавляем его
			if(wordsFromWords[allWords[i]].includes(el)){
				newArr.push(i);
			}
		}
		compressedWords[el] = newArr;
	});
	delete compressedWords.newCompress;
	delete compressedWords.notStringed;

	return compressedWords;
}






const lastVersion = "ver-11";
// Поиск слова
// let length = 0;
// for(let i = 0; i < allWords.length; i++){
//   if(wordsFromWords[allWords[i]].length > length){
//     length = wordsFromWords[allWords[i]].length;
//     console.log(allWords[i], length);
//   }
// }
// console.log(allWords.length, Object.keys(wordsFromWords).length);
// for(let i = 0; i < allWords.length; i++){
//   if(wordsFromWords[allWords[i]]){
//     console.log('true');
//   }else{
//     console.log('false');
//   }
// }
// let wordsCount = {};
// let allWordss = [];
// for(let key in wordsFromWords){
//   for(let i = 0; i < wordsFromWords[key].length; i++){
//     let w = wordsFromWords[key][i];
//     if(!allWordss.includes(w)){
//       allWordss.push(w);
//     }
//
//     if(wordsCount[w]) wordsCount[w]++;
//     else wordsCount[w] = 1;
//   }
// }
// setToStorage('bigstr1', JSON.stringify(allWordss));
// var sortable = [];
// for (var vehicle in wordsCount) {
//   sortable.push([vehicle, wordsCount[vehicle]]);
// }
//
// sortable.sort(function(a, b) {
//   return b[1] - a[1];
// });
// const newArr = [];
// for(let i = 150; i < 300; i++){
//   newArr.push(sortable[i][0]);
// }
// wordsFromWords["fls"] = newArr;
// let str = '';
// for(let i = 0; i <  sortable.length; i++){
//   if(sortable[i][1] >= 2){
//     str += sortable[i][0] + ', ';
//   }
// }
//
// setToStorage('bigstr', str);


function getFromStorage(name) {
	try {
		let val = localStorage.getItem(name);
		if (val) return val;
	} catch (e) {
	}
}

function setToStorage(name, val) {
	try {
		if(name === 'allDoneWords'){
			if(notRussianGame){
				localStorage.setItem('allDoneWordsEN', val);
				localStorage.setItem('timeEN', getSec() );
				return;
			}else{
				localStorage.setItem('time', getSec() );
			}
		}else if(name === 'tips' && notRussianGame){
			localStorage.setItem('tipsEN', val);
			return;
		}
		localStorage.setItem(name, val);
	} catch (e) {}
}

let notRussianGame = false;

let PLAYESTATE = {};
let PLAYERSTATS = {};
let doDeleteBlock;
let allDoneWords = getFromStorage('allDoneWords');
let tips = getFromStorage('tips');
let sounds = getFromStorage('sounds');
let isAdvShowed = getFromStorage('isAdvShowed');
let isGameAdvShow = getFromStorage('isGameAdvShow');
let isGameUpdate = getFromStorage('gameUpdate-1');

let russianProgressSave = {};
let englishProgress = false;
let russianTips = false;
let englishTips = false;

let lastProgressUpdate = getFromStorage('time');
if(lastProgressUpdate) lastProgressUpdate = Number(lastProgressUpdate);
else lastProgressUpdate = 0;

let cantSaveData = false;

isAdvShowed = !!isAdvShowed;
isGameUpdate = !isGameUpdate;
let loc = 0;
let allStars = [];
let isRules = false;
let allLocations = Math.floor(allWords.length / 21);
let lastLevel = 0;
function fixDoneWords(allDoneWords) {
	let keys = Object.keys(allDoneWords);
	for(let i = 0; i < keys.length; i++){

		let k = keys[i];
		if(keys[i].indexOf('ё') !== -1){
			k = k.replace(/ё/g, 'е');
		}else if(k === "ассиметрия"){
			console.log('асс');
			k = "асимметрия";
		}else if(k === "гитлеровец"){
			console.log('горицвет');
			k = "горицвет";
		}
		let words = allDoneWords[keys[i]] || allDoneWords[k];

		if(words === 1){
			allDoneWords[k] = wordsFromWords[k];
			if(k === "асимметрия"){
				delete allDoneWords["ассиметрия"];
			}else if(k === "горицвет"){
				delete allDoneWords["гитлеровец"];
			}
		}else{
			if(keys[i].indexOf('ё')  !== -1){
				words = words.map((word)=>word.replace(/ё/g, 'е'));
			}

			delete allDoneWords[keys[i]];

			if(words.length > 0){
				let allWords = wordsFromWords[k];
				if(allWords){
					words = words.filter((word)=>allWords.includes(word));
					allDoneWords[k] = words;
				}

			}
		}


	}
	return allDoneWords;
}
if(allDoneWords){
	allDoneWords = fixDoneWords(JSON.parse(allDoneWords));
	console.log('dsd', allDoneWords);
	tips = Number(tips);
	sounds = sounds === 'true';
	setLoc();
	console.log(allDoneWords);
	isGameAdvShow = !isGameAdvShow;
}else{

	allDoneWords = {};
	isGameAdvShow = false;
	isGameUpdate = false;
	tips = 10;
	isRules = true;
	sounds = true;

	allWords.forEach((key => {
		allDoneWords[key] = [];
	}));
	for(let i = 0; i < allWords.length; i++){
		allStars.push(0);
	}

}
try{
	if (getFromStorage('allDoneWordsEN')) {
		isRules = false;
	}
}catch(e){}




function switchToEnglishVersion(){
	wordsFromWords = wordsFromWordsEN;
	allWords = allWordsEN;
	notRussianGame = true;
	sounds = sounds === 'true';
	let allDoneWordsEN = getFromStorage('allDoneWordsEN');
	let tipsEN = getFromStorage('tipsEN');
	if(allDoneWordsEN){
		allDoneWords = fixDoneWords(JSON.parse(allDoneWordsEN));
		tipsEN = Number(tipsEN);
		if(tipsEN) tips = tipsEN;
		isRules = false;

		setLoc();
	}
}


let recentState = JSON.stringify(PLAYESTATE);
let recentStats = JSON.stringify(PLAYERSTATS);

let showUpdate = false;
let lastUpdate = getFromStorage('wasUpdate');
if(lastUpdate !== lastVersion && lastLevel > 0) {
	showUpdate = true;
	console.log(lastVersion + '; showUpdate: ', showUpdate);
}
setToStorage('wasUpdate', lastVersion);

function getSec(){
	let date = new Date();
	return date.getTime()
}

function setState(isNow) {
	const newData = JSON.stringify(PLAYESTATE);
	if(recentState === newData) return;
	console.log('setState');
	recentState = newData;

	if (playerGame) {

		if(notRussianGame){
			console.log(PLAYESTATE);
			const newState = {
				allDoneWords: russianProgressSave,
				allDoneWordsEN: compressData(PLAYESTATE.allDoneWords),
				time: getSec()
			};
			console.log(newState);
			playerGame.setData(newState, isNow).then(() => {
			}).catch((ignored) => {})


		}else{
			const newState = {
				allDoneWords: compressData(PLAYESTATE.allDoneWords),
				time: getSec()
			};

			if(englishProgress) newState.allDoneWordsEN = englishProgress;
			console.log(newState);
			playerGame.setData(newState, isNow).then(() => {
			}).catch((error) => {
				try{
					if(error.toString().includes('large')){
						params({'cantSave-bigData-first': lastLevel});
					}
					params({'cantSave-first': error});
				}catch(ignored){}
				playerGame.setData(newState, isNow).then(() => {
				}).catch((ignored) => {
					let state = {allDoneWords: replaceLevelsToOne(PLAYESTATE.allDoneWords), time: getSec()};
					if(englishProgress) state.allDoneWordsEN = englishProgress;
					playerGame.setData(state, isNow).then(() => {
					}).catch(() => {
					});
				})
			});
		}


	}
}
function setStats(isNow) {
	const newData = JSON.stringify(PLAYERSTATS);
	if(recentStats === newData) return;
	recentStats = newData;
	if(playerGame){
		if(notRussianGame){
			const progress = {tipsEN: PLAYERSTATS.tips};
			if(russianTips) progress.tips = russianTips;
			playerGame.setStats(progress, isNow).then((ignored) => {}).catch((ignored)=>{});
		}else{
			const progress = {tips: PLAYERSTATS.tips};
			if(englishTips) progress.tipsEN = englishTips;

			playerGame.setStats(progress, isNow).then((ignored) => {}).catch(()=>{
				playerGame.setStats(progress, isNow).then((ignored) => {})
			});
		}

	}





}

function saveAllData(isNow){
	console.log('saveAllData');
	setState(isNow);
	setStats(isNow);
}

window.onblur = () => saveAllData(true);
window.onunload = () => saveAllData(true);
window.onunload = () => saveAllData(true);
window.onpagehide = () => saveAllData(true);

setInterval(()=>{
	saveAllData(false);
}, 15000);



function setLastLevel() {
	for(let i = allWords.length-1; i >= 0 ; i--){
		if(allDoneWords[allWords[i]].length > 0){
			console.log('last level, ', i);
			lastLevel = i;
			break;
		}
	}
}

function getAllStars(allDoneWords){
	let allStars = 0;
	allWords.forEach((key => {
		if(allDoneWords[key]){
			allStars += testStar(allDoneWords[key].length, wordsFromWords[key].length);
		}
	}));
	return allStars;
}

function setLoc() {
	allWords.forEach((key => {
		if(allDoneWords[key]){
			allStars.push(testStar(allDoneWords[key].length, wordsFromWords[key].length))
		}else{
			allDoneWords[key] = [];
			allStars.push(0);
		}
	}));
	setLastLevel();
	loc = Math.floor((lastLevel / 21));
	if(allStars.reduce((acc, st)=>{
		return acc + st;
	}, 0) < loc*32){
		loc--;
	}
	if(loc >= allLocations || loc < 0) loc = 0;
}

let ruLangs = ['ru', 'be', 'kk', 'uk', 'uz', 'kz'];

let payloadLevel = false;

if(window.YaGames){
	window.YaGames.init({
		adv: {
			onAdvClose: wasShown => {
				if(!wasShown) {
					advTime = true;
				}

				canShowAdv();
			}
		}
	}).then(ysdk => {
		YSDK = ysdk;


		try{
			console.log("LANG: ", ysdk.environment.i18n.lang);
			notRussianGame = !ruLangs.includes(ysdk.environment.i18n.lang);
			if(notRussianGame){
				console.log('EN');
				isRules = false;
				lastLevel = 0;
				params({'eng': 1});
				switchToEnglishVersion();
			}else{
				console.log('RU')
			}

			//Payload
			let lvl = ysdk.environment.payload;
			console.log('PAYLOAD');
			console.log(lvl);
			if(lvl){
				payloadLevel = Number(lvl) - 1;
				if(payloadLevel < 0) payloadLevel = 0;
				else if(payloadLevel > 1500) payloadLevel = 1499;
			}
		}catch(ignored){}


		initPlayer(ysdk);
		var isNativeCache = ysdk.yandexApp && ysdk.yandexApp.enabled;
		if ('serviceWorker' in navigator && !isNativeCache) {
			window.onload = function(){
				navigator.serviceWorker
					.register('sw.js')
					.then(function(reg) {
						console.log('Registration succeeded. Scope is ' + reg.scope);
					})
					.catch(function(error) {
						console.error('Trouble with sw: ', error);
					});
			};
		}
		showAdv = () => {
			ysdk.adv.showFullscreenAdv({
				callbacks: {
					onClose: function() {

						advTime = false;
						canShowAdv();

						setTimeout(()=>{
							advTime = true;
							console.log('set to true');
							canShowAdv();
						}, 190000);
					}
				}
			});
		};
	}).catch(e=>{
		console.log(e);
		doDeleteBlock = true;
		update();
	});
}else{
	doDeleteBlock = true;
}
function update() {
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("updateAll"));
	}

}
function canShowAdv() {
	if (document.querySelector('.levels')) {
		document.querySelector('.levels').dispatchEvent(new CustomEvent("canShowAdv"));
	}
}
function reachGoal(goal) {
	try{
		// eslint-disable-next-line no-undef
		ym(57682372,'reachGoal', goal)
		// eslint-disable-next-line no-empty
	}catch(ignored){}
}
let paymentCatalog = false;
function initPlayer(ysdk) {
	console.log(ysdk);
	ysdk.getPlayer().then(_player => {
		console.log('get player');



		// Игрок авторизован.
		playerGame = _player;
		let someTrue = false;
		let change = true;
		isRules = false;

		playerGame.getData(['allDoneWords', 'time', 'allDoneWordsEN'], false).then((dataObject) => {
			console.log(dataObject);
			if(notRussianGame){
				allDoneWords = {};
				PLAYESTATE = {allDoneWords: {}};
				console.log("DATA EN");
				console.log(dataObject.allDoneWordsEN);
				if(dataObject.allDoneWordsEN){
					let newData = dataObject.allDoneWordsEN;

					if(typeof newData === "string" || (typeof newData === "object" && newData.notStringed)){
						newData = decompressData(newData);
					}

					newData = fixDoneWords(newData);
					console.log("IS DAT");
					console.log(newData);

					PLAYESTATE = {allDoneWords: newData};
					recentState = JSON.stringify(PLAYESTATE);
					allDoneWords = newData;

				}else{
					lastLevel = 0;
				}

				if(dataObject.allDoneWords){
					russianProgressSave = dataObject.allDoneWords;
				}

			}else if (dataObject.allDoneWords) {
				isRules = false;

				if(dataObject.allDoneWordsEN) englishProgress = dataObject.allDoneWordsEN;
				console.log(dataObject);
				let newData = dataObject.allDoneWords;

				// if(dataObject.cantSaveData){
				//   cantSaveData = true;
				// }
				console.log('new data');
				console.log(newData);
				if(typeof newData === "string"  || (typeof newData === "object" && newData.notStringed)){
					newData = decompressData(newData);
				}else if(newData.doneLevels !== undefined){
					newData = decompressDataObj(newData);
				}
				newData = fixDoneWords(newData);
				console.log(newData);




				let localStars = getAllStars(allDoneWords);
				let serverStars = getAllStars(newData);
				if(dataObject.time && lastProgressUpdate && lastProgressUpdate > dataObject.time && localStars > serverStars){
					PLAYESTATE = {allDoneWords: allDoneWords};
				}else{
					allDoneWords = newData;
					PLAYESTATE = {allDoneWords: newData};

					recentState = JSON.stringify(PLAYESTATE);
					if(change){
						allDoneWords = newData;
						setToStorage('allDoneWords', JSON.stringify(replaceLevelsToOne(allDoneWords)));
					}else{
						PLAYESTATE.allDoneWords = fixDoneWords(allDoneWords);
						recentState = JSON.stringify(PLAYESTATE);
						setState();
					}
				}


			}  else{
				isRules = true;
			}
			//Вовзврат прогресса
			try{
				let llsmz = getFromStorage('llsmz');
				if(!llsmz){
					const ss = new URLSearchParams(window.location.search);
					let lvl = Number(ss.get('llsmz'));
					if(lvl){
						let newObj = {};
						for(let i = 0; i < lvl; i++){
							newObj[allWords[i]] = wordsFromWords[allWords[i]];
						}
						console.log(newObj);
						PLAYESTATE.allDoneWords = newObj;
						allDoneWords = newObj;
						setState();
						setToStorage('llsmz', 'true');
					}
				}


			}catch(e){
				console.log('прогресс - errr')
				console.log(e);
			}

			if(someTrue){
				update();
			}
			someTrue = true;


		}).catch((e) => {
			console.log(e);
			if(someTrue){
				update();
			}
			someTrue = true;
		});

		playerGame.getStats(['tips', 'tipsEN'], false).then((dataObject) => {
			if(notRussianGame){
				if(dataObject.tipsEN){
					tips = dataObject.tipsEN;
				}else{
					tips = 10;
				}
				if(dataObject.tips) russianTips = dataObject.tips;

				PLAYERSTATS = {'tips': dataObject.tipsEN};
				recentStats = JSON.stringify(PLAYERSTATS);

			}else if (dataObject.tips) {
				if(change){
					tips = dataObject.tips;
					PLAYERSTATS = {'tips': tips};
					recentStats = JSON.stringify(PLAYERSTATS);

					if(dataObject.tipsEN) englishTips = dataObject.tipsEN;

					setToStorage('tips', tips);
				}
			}

			if(someTrue){
				update();
			}
			someTrue = true;
		}).catch((e) => {
			console.log(e);
			if(someTrue){
				update();
			}
			someTrue = true;
		});
	}).catch((e) => {
		console.log(e);
		doDeleteBlock = true;
		update();
	});
	ysdk.getPayments({ signed: false }).then(_payments => {
		_payments.getCatalog().then(catalog => paymentCatalog = catalog );
		// Покупки доступны.
		payments = _payments;
		payments.getPurchases().then(purchases => purchases.forEach(consumePurchase));
	}).catch(err => {
		console.log(err);
	});
}
let TIPS = 0;
let allTips = [20,50,100];
function consumePurchase(purchase) {
	if (purchase.productID === 'cart_item2') TIPS = allTips[0];
	if (purchase.productID === 'cart_item3') TIPS = allTips[1];
	if (purchase.productID === 'cart_item4') TIPS = allTips[2];
	params({[purchase.productID]: 1});
	document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
	payments.consumePurchase(purchase.purchaseToken);
}
const itemsPrices = [49, 99, 149];

function buyTips(item) {
	if(payments && playerGame){
		let purchaseItem = 'cart_item' + item;
		payments.purchase(purchaseItem).then(purchase => {
			if(purchase.productID === purchaseItem){
				if(item === 2) TIPS = allTips[0]; //20
				if(item === 3) TIPS = allTips[1]; //50
				if(item === 4) TIPS = allTips[2]; //100
				let it = 'buy-' + item;
				params({[it]: 1});
				document.querySelector('.levels').dispatchEvent(new CustomEvent("buyTips"));
				payments.consumePurchase(purchase.purchaseToken);

				getBusinessEvent(itemsPrices[item-2], 'tip' + item);
			}
		}).catch((e)=>{
			console.log("PAYMENTS ERROR: " + e);
		});
	}else{
		console.log('open auth');
		YSDK.auth.openAuthDialog().then(() => {
			// Игрок успешно авторизован, теперь объект Player будет инициализирован.
			console.log('успешно авторизован');
			initPlayer(YSDK);
		}).catch((ignored) => {// Игрок не авторизован.
		});
	}
}







function testStar(doneWordsLength, allWordsLength) {
	if(doneWordsLength >= allWordsLength) return 3;
	let percent = Math.floor(doneWordsLength / allWordsLength * 100);
	if(percent >= 66) return 2;
	if(percent >= 33) return 1;
	return 0;
}
const NewAudioContext = (function() {

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.audioContext = new window.AudioContext();
	} catch (e) {
		console.log("No Web Audio API support");
	}
	/*
     * WebAudioAPISoundManager Constructor
     */
	var WebAudioAPISoundManager = function (context) {
		this.context = context;
		this.bufferList = {};
		this.playingSounds = {};
	};

	/*
     * WebAudioAPISoundManager Prototype
     */
	WebAudioAPISoundManager.prototype = {
		addSound: function (url) {
			// Load buffer asynchronously
			var request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.responseType = "arraybuffer";

			var self = this;

			request.onload = function () {
				// Asynchronously decode the audio file data in request.response
				self.context.decodeAudioData(
					request.response,

					function (buffer) {
						if (!buffer) {
							console.log('error decoding file data: ' + url);
							return;
						}
						self.bufferList[url] = buffer;
					});
			};

			request.onerror = function () {
				console.log('BufferLoader: XHR error');
			};

			request.send();
		},
		stopSoundWithUrl: function(url) {
			if(this.playingSounds.hasOwnProperty(url)){
				for(var i in this.playingSounds[url]){
					if(this.playingSounds[url].hasOwnProperty(i)) {
						this.playingSounds[url][i].stop(0);
					}
				}
			}
		}
	};

	/*
     * WebAudioAPISound Constructor
     */
	var WebAudioAPISound = function (url, options) {
		this.settings = {
			loop: false
		};

		for(var i in options){
			if(options.hasOwnProperty(i)) {
				this.settings[i] = options[i];
			}
		}

		this.url = url + '.mp3';
		this.volume = 1;
		window.webAudioAPISoundManager = window.webAudioAPISoundManager || new WebAudioAPISoundManager(window.audioContext);
		this.manager = window.webAudioAPISoundManager;
		this.manager.addSound(this.url);
		// this.buffer = this.manager.bufferList[this.url];
	};

	/*
     * WebAudioAPISound Prototype
     */
	WebAudioAPISound.prototype = {
		play: function () {
			var buffer = this.manager.bufferList[this.url];
			//Only play if it loaded yet
			if (typeof buffer !== "undefined") {
				var source = this.makeSource(buffer);
				source.loop = this.settings.loop;
				source.start(0);

				if(!this.manager.playingSounds.hasOwnProperty(this.url)) {
					this.manager.playingSounds[this.url] = [];
				}
				this.manager.playingSounds[this.url].push(source);
			}
		},
		stop: function () {
			this.manager.stopSoundWithUrl(this.url);
		},
		getVolume: function () {
			return this.translateVolume(this.volume, true);
		},
		//Expect to receive in range 0-100
		setVolume: function (volume) {
			this.volume = this.translateVolume(volume);
		},
		translateVolume: function(volume, inverse){
			return inverse ? volume * 100 : volume / 100;
		},
		makeSource: function (buffer) {
			var source = this.manager.context.createBufferSource();
			var gainNode = this.manager.context.createGain();
			source.connect(gainNode);
			gainNode.gain.value = this.volume;
			source.buffer = buffer;
			// source.connect(gainNode);
			gainNode.connect(this.manager.context.destination);
			return source;
		}
	};

	return WebAudioAPISound;
})();

let wrongWordSound = new NewAudioContext('wrong-word2');
let doneWordSound = new NewAudioContext('done-word');
let starVolume = new NewAudioContext('star');
let newLevel = new NewAudioContext('new-level');
let clickSound = new NewAudioContext('click');

const lettersMap = {
	'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю','Q' : 'Й', 'W' : 'Ц', 'E' : 'У', 'R' : 'К', 'T' : 'Е', 'Y' : 'Н', 'U' : 'Г', 'I' : 'Ш', 'O' : 'Щ', 'P' : 'З', 'A' : 'Ф', 'S' : 'Ы', 'D' : 'В', 'F' : 'А', 'G' : 'П', 'H' : 'Р', 'J' : 'О', 'K' : 'Л', 'L' : 'Д', 'Z' : '?', 'X' : 'ч', 'C' : 'С', 'V' : 'М', 'B' : 'И', 'N' : 'Т', 'M' : 'Ь'
};

function doFirstLetterBig(str) {
	return str[0].toUpperCase() + str.slice(1);
}

function doFirstLetterSmall(str) {
	return str[0].toLowerCase() + str.slice(1);
}

function cantFindDesc() {
	console.log('cant find');
	try{
		if(notRussianGame){
			document.querySelector('.word-definition').innerHTML = 'Unfortunately, we couldn\'t find a definition. Try again later.'
		}else{
			document.querySelector('.word-definition').innerHTML = 'К сожалению, нам не удалось загрузить определение. Попробуйте позже.'
		}

	}catch(ignored){}
}
function getDefaultDesc() {
	try{
		if(notRussianGame){
			document.querySelector('.word-definition').innerHTML = 'Definition - loading...';
		}else{
			document.querySelector('.word-definition').innerHTML = 'Определение слова - загрузка...';
		}

	}catch(ignored){}
}
function addHTMLToDesc(html){
	try{
		document.querySelector('.word-definition').innerHTML = html.replace(/\u0301/g, "");
	}catch(ignored){}
}

function getEngDesc(word){
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
	const xhr = new XMLHttpRequest();


	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			let content = this.responseText;
			let str = '';
			let numDef = 1;
			try{
				content = JSON.parse(content);
				console.log(content);
				if(!(content.title === "No Definitions Found")){
					console.log('def f');
					for(let i = 0; i < content.length; i++){

						let means = content[i].meanings;
						console.log(means);
						for(let q = 0; q < means.length; q++){
							console.log(means[q]);
							if(means[q].partOfSpeech === "noun"){
								for(let z = 0; z < means[q].definitions.length; z++){
									str += numDef + ') ' +  means[q].definitions[z].definition + ' ';
									numDef++;
								}
							}
						}
					}
				}
				if(str){
					addHTMLToDesc(doFirstLetterBig(word) + ' — ' + str);
				}else{
					cantFindDesc();
				}


			}catch(e){cantFindDesc();}
		}
	});


	xhr.open("GET", url);
	xhr.send();

}


function getWordDesc(word) {
	console.log('getWordDesc --- ', word);
	if(notRussianGame) return getEngDesc(word);
	if(dictionary[word]){
		addHTMLToDesc(dictionary[word]);
		return;
	}
	try{
		const url = "https://ru.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + word + "&origin=*";
		const url2 = "https://ru.wikipedia.org/api/rest_v1/page/summary/" + word + "_(значения)?origin=*";
		const url21 = "https://ru.wikipedia.org/api/rest_v1/page/summary/" + word + "?origin=*";
		const url3 = "https://api.dictionaryapi.dev/api/v2/entries/ru/" + word;
		const xhr = new XMLHttpRequest();
		const xhr2 = new XMLHttpRequest();
		const xhr21 = new XMLHttpRequest();
		const xhr3 = new XMLHttpRequest();

		//Ищем на вики именно значения (нулевой источник)
		function findInWiki(that, func){
			if (that.readyState === that.DONE) {
				let content = that.responseText;
				try{
					content = JSON.parse(content);
					if(content.title === "Not found." || content.extract_html.indexOf('<ul>') === -1){
						func();
					}else{
						addHTMLToDesc(content.extract_html);
					}
				}catch(e){
					func();
				}
			}
		}

		xhr2.addEventListener("readystatechange", function () {
			findInWiki(this, tryFindInFirstSource)
		});
		xhr2.open("GET", url2);
		xhr2.send();
		//Ищем в первом источнике
		function tryFindInFirstSource(){
			xhr21.open("GET", url21);
			xhr21.send();
		}
		xhr21.addEventListener("readystatechange", function () {
			findInWiki(this, tryFindInSecondSource)
		});
		//Если не нахоидм определение в первом источнике, ищем во втором
		function tryFindInSecondSource(){
			xhr3.open("GET", url3);
			xhr3.send();
		}
		xhr3.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				let content = this.responseText;
				try{
					content = JSON.parse(content);
					if(!(content.title === "No Definitions Found")){
						addHTMLToDesc(doFirstLetterBig(word) + ' — ' + doFirstLetterSmall(content[0].meanings[0].definitions[0].definition));
					}else{
						tryFindInThirdSource();
					}
				}catch(e){
					tryFindInThirdSource();
				}
			}
		});
		//Последняя попытка найти определение
		function tryFindInThirdSource(){
			xhr.open("GET", url);
			xhr.send();
		}
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				let content = this.responseText;
				try{
					content = JSON.parse(content);
					const pages = content.query.pages;
					const keys = Object.keys(pages);
					if(String(keys[0]) === '-1'){
						cantFindDesc();
					}else{
						let text = pages[keys[0]].extract.replace(/(\n){2,}/g, '\n');
						text = '<p>' + text.replace(/\n/, '</p><ul><li>');
						text = text.replace(/\n/g, '</li><li>') + '</ul>';
						text = text.replace('<li></li></ul>', '');
						text = text.replace('<li></ul>', '');
						text = text.replace('<ul><li></ul>', '');
						addHTMLToDesc(text);
					}

					// if(content.title === "Not found."){
					//   tryFindInThirdSource();
					// }else{
					//   document.querySelector('.word-definition').innerHTML = content.extract_html;
					// }
				}catch(e){
					cantFindDesc();
				}
			}
		});
	}catch(e){
		cantFindDesc();
	}
}

function params(data) {
	try{
		// eslint-disable-next-line no-undef
		ym(57682372, 'params', data);
		// eslint-disable-next-line no-empty
	}catch(ignored){}
}
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iOS){
	document.documentElement.addEventListener('gesturestart', function (event) {
		event.preventDefault();
	}, false);
}


function deletePreDownload(){
	if (document.querySelector(".pre-download")) {
		document.querySelector(".pre-download").remove()
	}
	if (document.querySelector(".pre-download2")) {
		document.querySelector(".pre-download2").remove()
	}
}

const cloudPhrases = [
	'Добро пожаловать в игру <span class="cloudHint__mainText">"Слова из слова"</span>! Составляйте слова, чтобы проходить уровни.',
	'Нажимайте на <span class="cloudHint__mainText">буквы снизу</span>, чтобы составить слово!',
	'Нажмите на <span class="cloudHint__mainText">стрелку</span>, чтобы отправить слово!',
	'Поздравляем! Ваше <span class="cloudHint__mainText">первое слово</span> уже на уровне. Давайте попробуем ещё!',
	'Введём вместе последнее слово!',
	'Нажмите на слово, чтобы узнать его <span class="cloudHint__mainText">значение</span>.',
	'Если закончились идеи, используйте <span class="cloudHint__mainText">подсказку</span>. На первом уровне подсказки бесконечны.',
	'Для перехода на следующий уровень заработайте хотя бы 1 <span class="cloudHint__mainText">звезду</span>.',
	'33% угаданных слов - это 1 звезда, 66% - 2 звезды, 100% - 3 звезды.',
	'За получение звёзд Вам выдаются <span class="cloudHint__mainText">бесплатные подсказки</span>.',
	'Ура! Вы <span class="cloudHint__mainText">успешно</span> закончили обучение. Желаем Вам удачи в прохождении игры!',
];

let tutorialStep = 0;
let isShowTutorial = true;
export default {
	name: 'App',
	data(){
		return {
			levels: true,
			content: false,
			lvl: 0,
			letters: [],
			selectedLetters: [],
			wordFromLetter: '',
			numOfLevels: allWords.length,
			location: loc,
			allLocations: allLocations,
			stars: allStars,
			nowWords: [],
			doneWords: [],
			tipCount: tips,
			isBadWord: false,
			rules: false,
			levelsAnim: false,
			shop: false,
			newWord: '',
			animWord: '',
			words: '',
			getStar: -1,
			animWordStart: '',
			isSounds: sounds,
			advShowNow: false,
			// showAdvTip: false,
			isAdvShowed: false,
			isSettings: false,
			showGameAdv: false,
			isGameAdvShow: false,
			wordWasIndex: -1,
			canShowAdv: false,
			showWordDesc: false,
			gameUpdate: isGameUpdate,
			showLastLevelInfo: showUpdate,
			wasUpdate: showUpdate,
			isLeaderBoard: false,
			leaderBoard: false,
			playerRait: false,
			purchaseCompleted: false,
			notRussian: notRussianGame,
			gameLastLevel: lastLevel,
			isTutorial: false,
			cloudHint: false,
			cloudsPhrase: cloudPhrases[0],
			tutorialSelected: -1,
			selectSend: false,
			selectMainWord: false,
			selectTip: false,
			canShowSkip: false
		}
	},
	computed:{
		allStars(){
			return this.stars.reduce((acc, el)=> acc+ el, 0);
		},
		showNextLoc(){
			return (this.gameLastLevel+1) >= (this.location + 1) * 21;
		}
	},
	methods:{
		endTutorial(){
			console.log('end');
		 	this.isTutorial = false;
		 	this.cloudHint = false;
			this.selectTip = false;
			this.selectMainWord = false;
			this.selectSend = false;
			this.tutorialSelected = -1;
		},
		startTutorial(){
			tutorialStep = 0;
			this.canShowSkip = true;
			this.isTutorial = true;
			this.cloudHint = true;
		},
		closeHint(){
			if(this.selectSend) return;
			if(tutorialStep === 0){
				this.cloudsPhrase = cloudPhrases[1];
				this.tutorialSelected = 0;
			} else if(tutorialStep === 5){
				this.tutorialSelected = 2;
				this.cloudsPhrase = cloudPhrases[1];
			} else if(tutorialStep === 10){
				this.tutorialSelected = 1;
				this.cloudsPhrase = cloudPhrases[1];
			}else if(tutorialStep === 17){
				this.cloudsPhrase = cloudPhrases[8];
			}else if(tutorialStep === 18){
				this.cloudsPhrase = cloudPhrases[9];
			}else if(tutorialStep === 19){
				this.cloudsPhrase = cloudPhrases[10];
			} else if(tutorialStep === 20){
				this.endTutorial();
			} else{
				return;
			}
			this.wordFromLetter = '';
			this.selectedLetters = [];
			tutorialStep++;

			// this.cloudHint = false;
		},
		nextStep(){

			if(tutorialStep >=1 && tutorialStep <= 3){
				this.tutorialSelected = 2 + tutorialStep;
			}else if(tutorialStep === 6){
				this.tutorialSelected = 1;
			}else if(tutorialStep === 7){
				this.tutorialSelected = 4;
			}else if(tutorialStep === 8 || tutorialStep === 13){
				this.tutorialSelected = 5;
			} else if(tutorialStep === 11){
				this.tutorialSelected = 2;
			}else if(tutorialStep === 12){
				this.tutorialSelected = 3;
			}else if(tutorialStep === 4 || tutorialStep === 9 || tutorialStep === 14){
				this.tutorialSelected = -1;
				this.selectSend = true;
				this.cloudsPhrase = cloudPhrases[2];
			}else{
				return;
			}
			tutorialStep++;
		},
		togglePurchaseCompleted(){
			this.purchaseCompleted = false;
		},
		getAuth(){
			try{
				YSDK.auth.openAuthDialog().then(() => {
					initPlayer(YSDK);
				}).catch((e) => {
					console.log(e);
				});
			}catch(ignored){}

		},
		getPlayerLB(){
			try{
				let that = this;
				YSDK.getLeaderboards()
					.then(lb => {
						//Получаем игрока
						lb.getLeaderboardPlayerEntry("lvl")
							.then(player => {
								console.log(player);
								that.playerRait = player;
								if(!player || that.allStars > player.score){
									lb.setLeaderboardScore('lvl', that.allStars);
								}
							})
							.catch(e => {
								console.log(e);
								that.addPlayerToLB();
							})
					})
				;
			}catch(e){
				this.playerRait = false;
				this.addPlayerToLB();
				console.log(e);
			}
		},
		addPlayerToLB(){
			try{
				YSDK.getLeaderboards()
					.then(lb => {
						lb.setLeaderboardScore('lvl', this.allStars);
					});
			}catch(e){
				console.log(e);
			}
		},
		getLeaderBoard(){
			let that = this;
			this.getPlayerLB();
			YSDK.getLeaderboards()
				.then(lb => {
					console.log(lb);
					// Получение 10 топов
					lb.getLeaderboardEntries('lvl', { quantityTop: 20, includeUser: true, quantityAround: 3}).then(res => {
						that.leaderBoard = res.entries;

						setTimeout(()=>{
							try{
								let scrollEl = document.querySelector('.leaderBoardInfo_my');
								scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
							}catch(ignored){}

						}, 200);
						console.log(that.leaderBoard);
					});
				})
				.catch(e => {
					that.leaderBoard = false;
					console.log(e);
				})
			;
		},
		toggleLeaderBoard(){
			this.isLeaderBoard = !this.isLeaderBoard;
			if(this.isLeaderBoard){
				this.getLeaderBoard();
			}
		},
		toggleShowWordDesc(){
			this.showWordDesc = !this.showWordDesc;
			if(!this.showWordDesc){
				getDefaultDesc();
			}
			this.selectMainWord = '';
			if(!this.showWordDesc && this.isTutorial && tutorialStep === 15){
				this.cloudsPhrase = cloudPhrases[6];
				tutorialStep++;
				this.selectMainWord = false;
				this.selectTip = true;
			}
		},
		getItemPrice(item){
			try{
				if(paymentCatalog){
					return paymentCatalog[item].price;
				}
			}catch(e){}
			return itemsPrices[item] + ' рублей';
		},
		toggleShowLastLevelInfo(){
			this.showLastLevelInfo = false;
			this.wasUpdate = false;
		},
		toggleGameUpdate(){
			this.gameUpdate = false;
			setToStorage('gameUpdate-1', 'false');
		},
		setCanShowAdv(){
			this.canShowAdv = advTime;
		},
		changeGameAdvShow(){
			this.isGameAdvShow = false;
			isGameAdvShow = false;
			setToStorage('isGameAdvShow', 'true');
		},
		updateAll() {
			console.log('update');
			allStars = [];
			loc = 0;
			console.log(allDoneWords);
			setLoc();
			this.isLeaderBoard = false;
			this.stars = allStars;
			this.location = loc;
			this.tipCount = tips;
			this.notRussian = notRussianGame;
			setToStorage('tips', this.tipCount);
			this.isSounds = sounds;
			deletePreDownload();
			this.openLastLevel();
			this.getPlayerLB();
			if(isRules && !notRussianGame && isShowTutorial){
				this.startTutorial();
			}else{
				this.endTutorial();
			}

			this.gameLastLevel = lastLevel;
		},
		getLevel(lvl, notSound){
			if(payloadLevel){
				lvl = payloadLevel;
				payloadLevel = false;
				if(lastLevel < lvl) lastLevel = lvl;
				params({'payload': 1});
				this.endTutorial();
				isShowTutorial = false;

			} else if(this.isCloseLevelShow(lvl+1))return;


			if(lvl !== 0 && lvl % 100 === 0 && notRussianGame){
				let name = 'eng' + lvl;
				params({[name]: 1});
			}






			this.advShowNow = false;
			this.levelsAnim = false;

			if(!notSound){
				this.isGameAdvShow = isGameAdvShow;
			}

			if(this.isSounds && !notSound){
				newLevel.play();
			}

			this.getStar = -1;
			setTimeout(()=>{
				this.levels = false;
			}, 500);

			this.content = true;

			this.newWord ='';
			this.animWord ='';
			this.animWordStart = '';
			this.lvl = lvl;
			this.wordFromLetter = '';
			this.word = allWords[lvl];
			this.doneWords = allDoneWords[this.word];
			if(allDoneWords[this.word] === 1){
				this.doneWords = wordsFromWords[this.word];
			}else if(allDoneWords[this.word] === undefined){

				allDoneWords[this.word] = [];
				this.doneWords = allDoneWords[this.word];
			}
			if(lvl < 5 && this.doneWords.length === 0){
				let levelName = 'startLevel' + (lvl+1);
				params({[levelName]: 1})
			}

			this.selectedLetters = [];


			this.letters = this.word.split('');
			this.nowWords = wordsFromWords[this.word].slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});
			setTimeout(()=>{
				document.querySelector('.words').scrollTo({
					left: 0,
					behavior: "smooth"
				});
			}, 200);

			if(!this.isTutorial && showAdv && advTime){
				setTimeout(()=>{
					showAdv();
					this.advShowNow = true;
					setTimeout(()=>{
						this.advShowNow = false;
					}, 10000)
				}, 300)
			}


		},
		getLevelByLevelAndLocation(level){
			return (this.location*21) + level;
		},
		toggleSettings(){
			this.isSettings = !this.isSettings;
		},
		addBuyTips(){
			this.tipCount += TIPS;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
			this.purchaseCompleted = true;
			this.shop = false;
			setStats();
		},
		buyTip(item){
			buyTips(item);
		},
		sendParams(par){
			try{
				params(par);
			}catch(ignored){}

		},
		toggleRules(){
			this.rules = !this.rules;
			this.sendParams({'openRules': 1});
		},
		toggleShop(){
			this.shop = !this.shop;
		},
		switchSounds(e){
			this.isSounds = e.target.checked;
			setToStorage('sounds', this.isSounds);
		},
		closeShowAdvTip(){
			this.showAdvTip = false;
		},
		isCloseLevelShow(level){
			level--;
			if(level === 0 || (lastLevel === level-1 && this.stars[lastLevel] > 0)) return false;
			return lastLevel < level;
		},
		isLevelDone(level){
			level--;
			if(lastLevel === level && this.stars[lastLevel] === 0) return false;
			return lastLevel >= level;
		},
		openWordDescription(word){
			if(this.doneWords.includes(word)){
				this.toggleShowWordDesc();
				getWordDesc(word);
			}
		},
		pressKey(e){
			if(!this.content) return;
			let letter = e.key;
			if(letter === 'Backspace'){
				if(this.isTutorial) return;
				this.selectedLetters.pop();
				this.wordFromLetter = this.wordFromLetter.slice(0, -1);
			}else if(letter === 'Enter'){
				if(this.isTutorial && !this.selectSend) return;
				this.sendWord();
			} else{
				letter = letter.toLowerCase();
				if(!notRussianGame && lettersMap[letter]) letter = lettersMap[letter].toLowerCase();
				if(this.isTutorial && letter !== this.word[this.tutorialSelected]){
					return;
				}
				for(let i = 0; i < this.letters.length; i++){
					if(letter === this.letters[i] && !this.selectedLetters.includes(i)){
						this.selectedLetters.push(i);
						this.wordFromLetter += letter;
						if(this.isSounds){
							clickSound.play();
						}
						break;
					}
				}
				if(this.isTutorial){
					this.nextStep();
				}
			}
		},
		testShowNextLevel(){
			if(this.lvl < lastLevel) return true;
			return this.lvl === lastLevel && this.stars[this.lvl] > 0;
		},
		nextLevel(){
			if(this.testShowNextLevel()){
				if(this.lvl+1 === allWords.length){
					this.showLastLevelInfo = true;
					return;
				}
				this.getLevel(this.lvl+1);
			}
		},
		prevLocation(){
			if(this.location > 0){
				this.location--;
				if(this.isSounds){
					clickSound.play();
				}
			}
		},
		nextLocation(){
			if(this.location < this.allLocations-1){
				this.location++;
				if(this.isSounds){
					clickSound.play();
				}
			}
		},
		selectLetter(index){
			// if(this.animWordStart !== '') return;
			if(this.isSounds){
				clickSound.play();
			}
			if(this.isTutorial){
				this.nextStep();
			}
			let ind = this.selectedLetters.indexOf(index);

			if(ind >= 0){
				this.selectedLetters.splice(ind, 1);
				this.wordFromLetter = this.wordFromLetter.slice(0, ind) + this.wordFromLetter.slice(ind+1);
			}else if(ind === -1 ){
				this.selectedLetters.push(index);
				this.wordFromLetter += this.letters[index];
			}
		},
		backMenu(){
			if(this.isTutorial) return;
			if(this.isSounds){
				clickSound.play();
			}

			this.levels =  true;
			this.levelsAnim =  true;
			setTimeout(()=>{
				this.content = false;
			}, 500);

		},
		addTip(){
			this.tipCount++;
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
		},
		getTip(){
			if(this.animWordStart !== '') return;
			if(this.tipCount < 1){
				if(showAdv && advTime){
					params({'showRewarded': 1});
					advTime = false;
					canShowAdv();
					setTimeout(()=>{
						advTime = true;
						canShowAdv();
					}, 190000);
					let that= this;
					YSDK.adv.showFullscreenAdv({
						callbacks: {
							onClose: function() {
								that.addTip();
							}
						}
					});
				}else{
					this.toggleShop();
				}
				return;
			}
			if(this.doneWords.length === this.nowWords.length) return;
			if(this.lvl > 0){
				this.tipCount--;
			}
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;

			let arr = wordsFromWords[this.word].slice();
			for(let i = 0; i < this.doneWords.length; i++){
				arr.splice(arr.indexOf(this.doneWords[i]), 1);
			}
			let rand = Math.floor(Math.random()*arr.length);
			this.wordFromLetter = arr[rand];
			this.sendWord();


			if(this.isTutorial && tutorialStep === 16){
				this.cloudHint = false;
				this.selectTip = false;
				tutorialStep++;
				setTimeout(()=>{
					this.cloudHint = true;
					this.cloudsPhrase = cloudPhrases[7];
				}, 2000);
			}
		},
		sendWord(){
			if(this.wordFromLetter.length === 0 || this.isBadWord) return;
			if(this.nowWords.includes(this.wordFromLetter) && !this.doneWords.includes(this.wordFromLetter)){
				this.animWordStart = this.wordFromLetter;
				let wordFromLetter = this.wordFromLetter;
				this.wordFromLetter = '';
				this.selectedLetters = [];
				//Туториал
				if(this.isTutorial){
					if(tutorialStep === 5 || tutorialStep === 10 || tutorialStep === 15){
						this.cloudHint = false;
						this.selectSend = false;
						setTimeout(()=>{
							this.cloudHint = true;
							if(tutorialStep === 5){
								this.canShowSkip = false;
								this.cloudsPhrase = cloudPhrases[3];
							}else if(tutorialStep === 10){
								this.cloudsPhrase = cloudPhrases[4];
							}else if(tutorialStep === 15){
								this.cloudsPhrase = cloudPhrases[5];
								this.selectMainWord = 'илот';

								setTimeout(()=>{
									try{
										let scrollEl = document.querySelector('.tutorialSelected');
										scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
									}catch(ignored){}

								}, 200);

							}

						}, 1700);
					}


				}
				//Туториал - END
				setTimeout(()=>{
					try{
						let scrollEl = document.querySelector('.animWordStart');
						scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
					}catch(e){
						console.log('Ошибка показа');
					}
					if(this.isSounds){
						doneWordSound.play();
					}
					this.addWord(wordFromLetter);
					this.animWord = wordFromLetter;
					this.newWord = wordFromLetter;
					setToStorage('allDoneWords', JSON.stringify(replaceLevelsToOne(allDoneWords)));
					PLAYESTATE.allDoneWords = allDoneWords;
					setTimeout(()=>{
						this.animWordStart = '';
						this.animWord = '';

						if(!this.testStars()){
							if(showAdv && advTime){
								setTimeout(()=>{
									showAdv();
									this.advShowNow = true;
									setTimeout(()=>{
										this.advShowNow = false;
									}, 10000)
								}, 300)
							}
						}

					}, 1000)
				}, 100);

			}else{
				this.isBadWord = true;
				if(this.isSounds){
					wrongWordSound.play();
				}

				if(this.doneWords.includes(this.wordFromLetter)){
					this.wordWasIndex = this.nowWords.indexOf(this.wordFromLetter);
					setTimeout(()=>{
						try{
							let scrollEl = document.querySelector('.wordWas');
							scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
						}catch(e){
							console.log('Ошибка показа');
						}
					}, 100);

					setTimeout(()=>{
						this.wordWasIndex = -1;
					}, 1200)

				}

				setTimeout(()=>{
					this.isBadWord = false;
					this.wordFromLetter = '';
					this.selectedLetters = [];
				}, 400)
			}
		},
		testStars(){
			let stars = testStar(this.doneWords.length, this.nowWords.length);
			if(stars > this.stars[this.lvl]){

				if(this.lvl < 5 && stars === 1){
					let levelName = 'endLevel' + (this.lvl+1);
					params({[levelName]: 1})
				}

				setLastLevel();
				this.gameLastLevel = lastLevel;
				this.getStar = stars;
				this.stars.splice(this.lvl, 1, stars);
				if(this.isSounds){
					starVolume.play();
				}
				this.addPlayerToLB();
				setTimeout(()=>{
					this.getStar = -1;
					if(stars === 3){
						this.tipCount += 3;
					}else if(stars === 2){
						this.tipCount += 2;
					} else{
						this.tipCount++;
					}

					setToStorage('tips', this.tipCount);
					PLAYERSTATS.tips = this.tipCount;
					saveAllData(false);
					if(showAdv && advTime){
						setTimeout(()=>{
							showAdv();
							this.showAdv++;
							this.advShowNow = true;
							setTimeout(()=>{
								this.advShowNow = false;
							}, 10000)
						}, 300)
					}
				}, 1000);
				return true;
			}
			return false;

		},
		addWord(word){
			this.doneWords.push(word);
		},
		openLastLevel(){
			try{
				this.getLevel(lastLevel, true);
			}catch(ignored){};
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			if (doDeleteBlock) {
				deletePreDownload();
				if(isRules && !payloadLevel){
					this.startTutorial();
				}
			}
			this.openLastLevel();
			document.addEventListener('keydown', this.pressKey)
		})
	}
}
</script>
<style>

::-webkit-scrollbar-button {
	background-repeat:no-repeat;
	width:6px;
	height:0;
}

::-webkit-scrollbar-track {
	background-color: #261624;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}

::-webkit-scrollbar-thumb {
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background-color: #ad63b6;
}

::-webkit-resizer{
	background-repeat:no-repeat;
	width: 5px;
	height: 0;
}

::-webkit-scrollbar{
	width: 5px;
	height: 13px;
}
@font-face {
	font-family: 'Roboto';
	src: url('assets/Roboto.ttf');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'Roboto';
	src: url('assets/Robotobold.ttf');
	font-weight: bold;
	font-style: normal;
}
@font-face {
	font-family: 'Ubuntu-Light';
	src: url('assets/Ubuntu-Light.ttf');
	font-weight: normal;
	font-style: normal;
}
html,body
{
	width:100%;
	height:100%;
	font: 10px/1.5 Roboto, sans-serif;
	-webkit-tap-highlight-color: transparent;
	-ms-user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	user-select: none;
}
.words, .action-block, .rules{
	font-family: Ubuntu-Light, sans-serif;
}
.switchSettings{
	position: relative;
	width: 40px;
	height: 40px;

	background: url(assets/settings.svg) center center no-repeat, #DADADA;
	background-size: 50%;
	border-radius: 50%;


	cursor: pointer;
}
.switchRules{
	font-size: 3.5rem;
	color: #faf5ac;
	cursor: pointer;
}
.switchShop, .leaderBoard, .switchSettings{
	display: inline-block;
	cursor: pointer;
}
.leaderBoard{
	background: url("assets/leader.svg") center center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 50%;

	margin-right: 25px;

}
.switchShop{

	width: 55px;
	height: 39px;


	background: url("assets/shop.svg") center center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 50%;
}

.rules-blackout{
	position: absolute;
	left: 0;
	top: 0;

	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);

	cursor: pointer;
	z-index: 9;
}
.main-blackout{
	z-index: 11;
}
.rules_lb{
	overflow: hidden;
}
@media (min-height: 500px){
	.rules_lb{
		height: 500px !important;
	}
	.leaderBoardInfo{
		height: 400px !important;
	}
	.rules__text{
		height: 420px !important;
	}
}
@media (min-height: 700px){
	.rules__text{
		height: 600px !important;
	}
}
@media (max-height: 330px){
	.rules__text{
		height: 225px !important;
	}
}
.leaderBoardInfo{
	width: 90%;
	margin: 0 auto;
	height: 220px;
	padding: 05px;
	overflow-y: auto;

	font-size: 1.5rem;
}
.leaderBoardInfo .settings__text{
	text-align: center;
	font-size: 2rem !important;
}
.leaderBoardInfo_my{
	background-color: #e8e6f9;
}
.lastRang{
	margin-bottom: 50px !important;
}
.leaderBoardInfo__playerInfo{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.leaderBoardInfo__player{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 2px solid #a15eb9;

	padding: 7px 15px;
	border-radius: 10px;

	margin-bottom: 5px;
}
.leaderBoardInfo__image{
	width: 50px;
	height: 50px;
	margin: 0 15px;

	border-radius: 50%;

	background-size: cover !important;
}
.leaderBoardInfo__image_no{
	background: url("assets/user.png") center center no-repeat !important;
	background-size: cover !important;
}
.leaderBoardInfo_1{
	font-size: 2.4rem;
}
.leaderBoardInfo_1 .leaderBoardInfo__image{
	width: 70px;
	height: 70px;
}
.leaderBoardInfo_2{
	font-size: 2.1rem;
}
.leaderBoardInfo_2 .leaderBoardInfo__image{
	width: 62px;
	height: 62px;
}
.leaderBoardInfo_3{
	font-size: 1.75rem;
}
.leaderBoardInfo_3 .leaderBoardInfo__image{
	width: 55px;
	height: 55px;
}

.rules{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);



	padding: 8px;
	width: 520px;

	font-size: 1.4rem;
	color: #302431;

	border: 3px solid #9e6db5;
	border-radius: 15px;
	background-color: rgba(250,250,250, 0.9);

	z-index: 12;
}
.rules__text{
	width: 99%;
	margin: 0 auto;
	overflow-y: auto;
	height: 250px;
	font-size: 1.7rem;
}
.rules__text img{
	margin: 10px 0;
	width: 99%;
}
.rules__notification{
	font-size: 1.6rem;
}
.rules__cross{
	position: absolute;
	top: 15px;
	right: 15px;

	width: 30px;
	height: 30px;

	background: url(assets/cross.png) center center no-repeat;
	background-size: 100%;
	cursor: pointer;
}
.rules__menu{
	font-size: 3rem;
	line-height: 3rem;
	text-align: center;
	color: #302431;

	margin: 5px 0 15px 0;
}
#app, .game, .levels{
	background: url(assets/bg-new.png) 50% no-repeat;
	background: url(assets/bg-new-big.png) 50% no-repeat;
	background-size: cover;
}
@media (min-width: 1800px) {
	#app, .game, .levels{
		background: url(assets/bg-new-big.png) 50% no-repeat;
		background-size: cover;
	}
}
#app, .game, .property, .levels, .levels__property{
	position: relative;

	width: 100%;
	height: 100%;
	-webkit-tap-highlight-color: transparent;
	-ms-user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	user-select: none;

	overflow: hidden;
}
.game{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 4;
	animation: getGameLevel 0.4s ease-in forwards;
}
.levelsAnim{
	z-index: 5;
	animation: getLevels 0.4s ease-in forwards;
}
@keyframes getLevels {
	0%{
		transform: translateX(-100%);
	}
	100%{
		transform: translateX(0);
	}
}
@keyframes getGameLevel {
	0%{
		transform: translateX(100%);
	}
	100%{
		transform: translateX(0);
	}
}
.property{
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
}


.blur{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.1);
}


/*Уровни*/
.levels__property{
	z-index: 2;
	display: flex;
	justify-content: center;
	flex-flow: column nowrap;
	align-items: center;
}
.levels{

}
.levelsTop{
	position: absolute;
	left: 50%;
	top: 0;

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 540px;
	height: 70px;

	z-index: 3;
	transform: translateX(-50%);
}
.levelsTop__allStars{

	display: flex;
	justify-content: center;
	align-items: center;

	height: 40px;

	padding: 0 12px;


	font-size: 2.2rem;
	line-height: 2.2rem;
	color: #66196C;

	background-color: rgba(255, 255, 255, 0.95);
	opacity: 0.85;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
	border-radius: 25px;


	letter-spacing: 2px;

	margin-left: 75px;
}

.levelsTop__allStars_withoutLB{
	margin-left: 0;
}


.levels .menu-star{

	background-color: #E5C726;
	opacity: 1;
}
.levelsTop__allStars .menu-star{
	width: 22px;
	height: 22px;
	margin-left: 0;

	background: url(assets/menu-all-star.png) center center no-repeat;
	background-size: 100%;
}
.sounds{
	right: 30px;
	top: 50%;
	transform: translateY(-50%);
	position: absolute;

	width: 30px;
	height: 30px;

	background: url(assets/sounds-off.png) center center no-repeat;
	background-size: 100%;

	cursor: pointer;
}
.sounds-on{
	background: url(assets/sounds-on.png) center center no-repeat;
	background-size: 100%;
}
.levels-wrapper{
	position: relative;

	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: auto;

	margin-top: 60px;
	padding: 10px;
}
.level{
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 60px;
	height: 60px;


	background-color: rgba(255, 255, 255, 0.85);
	border-radius: 50%;

	margin: 0 20px 26px 0;

	font-size: 2.9rem;
	color: #2C2C2C;

	cursor: pointer;

	box-shadow: 0 0 4px rgba(159, 102, 173, 0.4);

}
.levels-wrapper::before, .levels-wrapper::after {
	content: '';
	width: 100%;
	order: 1;
}
.level:nth-child(7n){
	margin-right: 0;
}
.level:nth-child(n + 8) {
	order: 1;
}
.level:nth-child(n + 15) {
	order: 2;
}
.level-done{
	/*color: #bb9bc5;*/
	/*border-color: #bb9bc5;*/
	/*box-shadow: none;*/
}
.level_close{
	color: #9A9A9A;
}
.menu__level_stars{
	display: flex;

	justify-content: center;
}
.level .menu__level_stars{
	position: absolute;
	left: 0;
	bottom: -15px;

	width: 100%;

	cursor: auto;

	justify-content: center;
}


.rules .settings__text{
	font-size: inherit;
}



/*Игра*/
.property{
	/*z-index: 2;*/
}
/*Меню*/
.menu{
	position: absolute;
	left: 0;
	top: 0;

	width: 100%;
	padding: 5px 0;

	display: flex;
	justify-content: space-around;
	align-items: center;


	color: white;

	/*background: rgba(0,0,0,0.1);*/

	z-index: 3;
}
.tutorialMenu{
	z-index: auto;
}
.menuItem{
	width: 40px;
	height: 40px;

	border-radius: 50%;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
.levelsTop .menuItem{
	width: 50px;
	height: 50px;
}
.menu__button-back, .menu__tip, .menu__button-next-level{
	background: url(assets/menu.svg) center center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 60%;

	border: none;
	cursor: pointer;

	position: relative;

	outline: none;
}
.menu__tip{
	position: relative;

	background: url(assets/tip.svg) center center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 40%;
}
.menu__tip_count, .advert{
	position: absolute;
	bottom: 0;
	right: -8px;

	display: flex;
	justify-content: center;
	align-items: center;

	padding: 0 5px;

	font-size: 1.2rem;

	background-color: #ad63b6;
	border-radius: 7px;
}
.menu__tip_count{
	color: white;
	background-color: #66196C;
	font-weight: bold;
	width: 35px;
	padding: 0 5px;
	right: -22px;
	height: 15px;
}
.advert{
	width: 15px;
	height: 15px;

	background: url("assets/advert.png") center center no-repeat white;
	background-size: 80%;
}
.menu__level, .menu__words-amount{
	font-size: 2.2rem;
	letter-spacing: 1px;
}
.menu__words-amount{
	position: relative;
	min-width: 60px;
	text-align: center;
}
.menu__words-amount:after, .menu__button-next-level:after, .menu__button-back:after, .menu__tip:after, .prev-location:after, .next-location:after, .switchSettings:after{
	position: absolute;
	content: '';
	top: -10px;
	left: -10px;
	right: -10px;
	bottom: -10px;
}
.menu__level{
	position: relative;
}

.menu__hint{
	position: absolute;
	bottom: -32px;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid #f8f7f8;
	display: none;
	padding: 5px;
	border-radius: 10px;
	font-size: 1.2rem;
	color: #f8f7f8;
	background-color: rgba(164, 104, 183, 0.9);
}
.menu__button-next-level .menu__hint{
	bottom: -125px;
}

.menu__words-amount:hover .menu__hint, .menu__button-next-level:hover .menu__hint{
	display: block;
}

.menu__button-next-level_active .menu__hint{
	display: none !important;
}

.menu__button-next-level{
	position: relative;
	background: url(assets/arrow_next_notActive.svg) 56% center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 33%;
	cursor: default;
}
.menu__button-next-level, .menu__button-next-level:active{
	outline: none;
}
.menu__button-next-level_active{
	background: url(assets/arrow_next_active.svg) 55% center no-repeat, rgba(255, 255, 255, 0.85);
	background-size: 35%;
	cursor: pointer;
}
.menu__button-next-level_active:active{
	transform: scale(0.98);
}

.menu__level .level_star{
	margin-right: 2px;

}
.level_star{
	width: 8px;
	height: 8px;

	border-radius: 50%;

	background-color: #DFDFDF;

}
.menu__level_stars .level_star{
	margin-right: 4px;
}
.menu__level_stars .level_star:last-child{
	margin-right: 0;
}
.menu__level .level_star{
	background: url(assets/empty-star.png) center center no-repeat;
	background-size: 100%;

	width: 15px;
	height: 15px;
}
.menu__level .menu__level_stars{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.menu__level .level_full-star.getStar{
	animation: showFullStar 1s forwards;
}
.menu__level .level_full-star{
	background: url(assets/menu-star.png) center center no-repeat;
	background-size: 100%;
}
@keyframes showFullStar {
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(2);
	}
	100%{
		transform: scale(1);
		background: url(assets/menu-star.png) center center no-repeat;
		background-size: 100%;
	}

}
.next-location, .prev-location{
	position: absolute;
	top: 99px;

	width: 14px;
	height: 53px;


	background: url(assets/angle-left.svg) center center no-repeat;
	background-size: 100%;

	cursor: pointer;
	z-index: 2;
}
.next-location{
	background: url(assets/angle-right.svg) center center no-repeat;
	background-size: 100%;
	right: 10px;
}
.next-location:active, .prev-location:active{
	transform: scale(0.98);
}
.prev-location{
	left: 10px;
}
/*Блок со всеми словами*/
.words{
	display: flex;
	flex-flow: column wrap;

	width: 100%;
	max-height: 54%;

	margin-top: 50px;

	padding: 10px;

	overflow-x: auto;
}
.words::-webkit-scrollbar { width: 0; }
.words__letters-block{
	display: flex;
	flex-flow: row nowrap;


	margin-bottom: 5px;
	padding-right: 30px;

	cursor: pointer;
}
.words__letters-block_done .words__letter{
	/*background-color: rgba(166,82,174);*/
	color: white;
	background-color: #BA6FC6;
}
.action-block__letters .action-block__letter_selected{
	color: white;
	background-color: #BF63C7;
}
.words__letter, .action-block__letter{
	display: flex;
	justify-content: center;
	align-items: center;

	width: 32px;
	height: 32px;

	margin: 1px;

	border-radius: 26%;

	font-size: 2.1rem;
	text-transform: uppercase;

	background-color: rgba(255, 255, 255, 0.9);

}
.action-block__letter{
	border-radius: 15%;
	background-color: white;
	color: #2C1345;
}
.tutorialSelected{
	z-index: 10;
}
.words__letter{
	background-color: rgba(255, 255, 255, 0.75);
}
.animWord .words__letter{
	animation: 1s showNewWord forwards;
	/*animation-delay: 0.2s;*/
}
.newWord .words__letter{
	background-color: #CC6F9C;
}
@keyframes  showNewWord{
	0%{
		background-color: rgba(255, 255, 255, 0.75);
	}
	100%{
		background-color: #CC6F9C;
	}
}
/*Взаимодействие*/
.done-word{
	z-index: 10;
	position: relative;
}
.action-block__done-word{
	min-height: 30px;

	font-size: 2.3rem;
	line-height: 2.3rem;
	text-align: center;
	color: white;
	text-transform: uppercase;
	letter-spacing: 1px;
}
.done-word{
	position: relative;
	display: inline-block;
}
.badWord{
	animation: tremor 0.05s ease-in-out infinite;
}

@keyframes tremor2 {
	0%{
		background-color: rgba(166,82,174,0.9);
	}
	100% {
		background-color: rgba(87, 41, 100, 0.9);
	}
}
@keyframes swing {
	20% {
		-webkit-transform: rotate3d(0, 0, 1, 15deg);
		-ms-transform: rotate3d(0, 0, 1, 15deg);
		transform: rotate3d(0, 0, 1, 15deg);
	}

	40% {
		-webkit-transform: rotate3d(0, 0, 1, -10deg);
		-ms-transform: rotate3d(0, 0, 1, -10deg);
		transform: rotate3d(0, 0, 1, -10deg);
	}

	60% {
		-webkit-transform: rotate3d(0, 0, 1, 5deg);
		-ms-transform: rotate3d(0, 0, 1, 5deg);
		transform: rotate3d(0, 0, 1, 5deg);
	}

	80% {
		-webkit-transform: rotate3d(0, 0, 1, -5deg);
		-ms-transform: rotate3d(0, 0, 1, -5deg);
		transform: rotate3d(0, 0, 1, -5deg);
	}

	100% {
		-webkit-transform: rotate3d(0, 0, 1, 0deg);
		-ms-transform: rotate3d(0, 0, 1, 0deg);
		transform: rotate3d(0, 0, 1, 0deg);
	}
}
.wordWas .words__letter{
	animation-duration: 1s;
	animation-fill-mode: both;
	transform-origin: center center;
	animation-name: swing;
	background-color: #66196C;
}



/*Магазин*/
.shop{
	min-height: 280px;
	border: 3px solid #9e6db5;
	border-radius: 15px;
	background-color: rgba(250,250,250, 0.9);

	height: 310px;

	min-width: 500px;
	width: 540px;
}
.mainShop{
	font-family: 'Roboto', sans-serif;
}
.shop .rules__menu{
	margin: 5px 0 15px 0;
	color: #514056;
}
.shop__cart{
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 225px;
}
.shop__cart__item{
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;

	height: 100%;

	background-color: white;
	border: 1px solid #9e6db5;
	padding: 5px;
	border-radius: 10px;

	width: 150px;

	cursor: pointer;

}
.shop__cart__name{
	margin: 15px 0 5px 0;
	text-align: center;
	color: #6C1969;
	font-size: 1.3rem;
	border-bottom: 1px solid #6C1969;
}
.shop__cart__item_1, .shop__cart__item_2, .shop__cart__item_3, .shop__cart__item_4{
	position: relative;
	width: 100%;
	height: 130px;
	flex: 1 0;
}

.cart__item_tip{
	position: absolute;
	top: 80%;
	right: 25%;
	bottom: auto;
	font-size: 1.2rem;
	padding: 0 6px;
}


.shop__cart__item_2 {
	background: url("assets/cart__item-2.svg") center bottom no-repeat;
	background-size: 50%;
}
.shop__cart__item_2 .cart__item_tip{
	right: 28%;
}
.shop__cart__item_3 {
	background: url("assets/cart__item-3.svg") 65% bottom no-repeat;
	background-size: 75%;
}
.shop__cart__item_3 .cart__item_tip{
	right: 29%;
}
.shop__cart__item_4 {
	background: url("assets/cart__item-4.svg") center bottom no-repeat;
	background-size: 90%;
}
.shop__cart__item_4 .cart__item_tip{
	right: 31%;
}

.shop__cart__buy-button{
	text-align: center;
	font-size: 1.5rem;

	color: #514056;
}
.shop__cart__buy-button:hover{
	box-shadow: none;
}
.shop__cart__buy-button:active{
	transform: scale(0.98);

}
.cart__item_tip{
	top: 83%;
}






@keyframes tremor {
	0%, 25% {
		left: -1px;
		transform: translateX(-5%);
	}
	50%, 100% {
		left: 1px;
		transform: translateX(5%);
	}
}
.action-block__letters{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
}
.action-block__letter{
	width: 40px;
	height: 40px;

	font-size: 2.4rem;
	margin-right: 7px;

	cursor: pointer;
	-ms-user-select: none;

	-moz-user-select: none;
	-khtml-user-select: none;


	-webkit-user-select: none;
}
.action-block__button-send{
	display: block;

	margin-left: 25px;

	width: 40px;
	height: 40px;

	background: url(assets/sendWord.svg) 55% 55% no-repeat, white;
	background-size: 17px 29px;

	border-radius: 15%;



	cursor: pointer;

	outline: none;
}
.action-block__button-send:active{
	transform: scale(0.98);
	outline: none;
}
.words__letter, .action-block__letter, .action-block__button-send{
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
}
@media (max-width: 600px) {
	.level{
		width: 55px;
		height: 55px;
		margin-right: 17px;
		font-size: 2.7rem;
	}
}
@media (min-width: 1000px) {
	.levelsTop{
		width: 750px;
	}
	.levelsTop .menuItem{
		width: 70px;
		height: 70px;
	}
	.rules__menu{
		font-size: 3.5rem;
		line-height: 3.5rem;
	}
	.rules{
		font-size: 2rem;
		padding: 20px 30px 30px 30px;
		width: auto;

		max-width: 650px;
	}
	.rules__notification{
		font-size: 2.3rem;
	}

	.rules__cross{
		top: 25px;
		right: 25px;
		width: 35px;
		height: 35px;
	}

	.advert {
		width: 20px;
		height: 20px;
	}
	.game{
		padding-bottom: 150px;
	}



	.shop{
		width: 650px;
		height: 350px;
	}
	.shop__cart{
		height: 255px;
	}
	.shop__cart__item{
		width: 180px;
	}

	.shop__cart__name{
		font-size: 1.7rem;
	}

	.shop__cart__buy-button{
		font-size: 1.85rem;
	}




	.levels-wrapper{
		margin: 0 auto;
	}
	.property{
		max-width: 1200px;
		margin: 0 auto;
	}
	.levels-wrapper{
		max-width: 1000px;
		margin: 0 auto;
	}
	.level{
		width: 90px;
		height: 90px;

		margin-bottom: 30px;

		font-size: 4.3rem;
	}
	.level .menu__level_stars{
		bottom: -18px;
	}
	.level_star{
		width: 13px;
		height: 13px;
	}
	.menu__level_stars .level_star {
		margin-right: 5px;
	}


	/*Игра*/
	.menu__button-back, .menu__button-next-level{
		width: 60px;
		height: 60px;
	}
	.next-location, .prev-location{
		width: 28px;
		height: 106px;
		top: 123px;
	}
	.next-location:active, .prev-location:active{
		transform: scale(0.98);
	}
	.menu__words-amount, .menu__level{
		font-size: 2.6rem;
	}
	.menu__hint{
		font-size: 1.4rem;
		bottom: -32px;
	}

	.menu__button-next-level .menu__hint {
		bottom: -70px;
		left: -80px;
		font-size: 1.3rem;
		width: 200px;
	}


	.menu__level .level_star{
		width: 22px;
		height: 22px;
	}
	.menu__tip{
		width: 60px;
		height: 60px;
	}
	.menu__tip_count{
		font-size: 1.7rem;
		line-height: 1.7rem;
		width: 50px;
		right: -30px;
		height: 20px;
	}
	.cart__item_tip{
		font-size: 1.3rem;
	}



	.words{
		margin-top: 60px;
	}
	.words__letter{
		width: 40px;
		height: 40px;

		font-size: 2.5rem;
	}
	.action-block__letter{
		width: 60px;
		height: 60px;
		font-size: 3.3rem;
	}
	.action-block__button-send{
		width: 62px;
		height: 62px;
	}
	.action-block__done-word{
		font-size: 2.7rem;
	}
}


.black-friday{
	color: black;
}
.red-friday{
	color: #bb0000;
	border-color: #bb0000;
}

.shop__cart__prices{
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
}
.last-price{
	color: black;
	position: relative;
	margin-right: 5px;
}
.now-price{
	margin-right: 4px;
}
.last-price:before{
	content: "";
	width: 0.8px;
	height: 90%;
	left: 40%;
	top: 1px;
	background-color: black;
	position: absolute;
	transform: rotate(120deg) translateX(-50%);
}
.adv-show{
	min-width: auto;
	width: 350px;
	text-align: center;
	font-size: 1.8rem;
}
.adv-show .rules__menu{
	font-size: 3rem;
}
.adv-show .rules__cross{
	width: 30px;
	height: 30px;
}

@media (min-width: 1000px) {
	.adv-show{
		padding: 20px;
		width: 350px;
		font-size: 2rem;
	}
	.adv-show .rules__menu{
		font-size: 3rem;
	}
	.adv-show .rules__cross{
		top: 26px;
		right: 22px;
		width: 32px;
		height: 32px;
	}
}
.ya-rules{
	padding: 5px 5px 10px 5px;
}
.ya-rules .rules__menu{
	font-size: 4rem;
}
.ya-button{
	width: 150px;
	padding: 5px 0;
	margin: 10px auto 0 auto;
	font-size: 2.3rem;
}

/*Настройки*/
.settings{
	position: absolute;
	left: 0;
	top: 0;
	width: 220px;
	height: 100%;
	padding: 10px;
	margin-left: auto;


	background-color: white;




	z-index: 10;

	animation: showSettings 0.4s ease-in-out forwards;

	overflow-y: auto;

}

.settings ul{
	padding: 0;
}
.settings__blackout{
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 3;

	cursor: pointer;
}
.settings__blackout{
	animation: showBlackout 0.4s ease-in-out forwards;
}

@keyframes showBlackout {
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}
@keyframes showSettings {
	0%{
		transform: translateX(-100%);
	}
	100%{
		transform: translateX(0);
	}
}
.settings__header{
	text-align: center;
	font-size: 2rem;
	color: #111112;

	padding-bottom: 5px;
	border-bottom: 1px solid rgba(0,0,0,0.4);

	margin-bottom: 10px;
}
.settings li{
	display: flex;
	align-items: center;
	margin-top: 15px;
}
.settings__name{
	flex: 1;
	font-size: 1.5rem;
}




.checkbox {
	position: absolute;
	z-index: -1;
	opacity: 0;
	margin: 10px 0 0 20px;
	user-select: none;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.checkbox + label {
	position: relative;

	width: 100%;

	display: flex;
	align-items: center;
	font-size: 1.7rem;


	cursor: pointer;
	padding-right: 50px;
}

.checkbox + label:before {
	content: "";
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
	width: 45px;
	height: 20px;
	border-radius: 15px;
	background: #CDD1DA;
	transition: 0.2s;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
}
.checkbox + label:after {
	content: "";
	position: absolute;
	top: 50%;
	transform: translateY(-53%);
	right: 28px;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: white;
	box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.35);
	transition: 0.2s;
}
.checkbox:checked + label:after {
	right: 0;
	background-color: #AE69C6;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}
.checkbox:checked + label:before {
	background: #E4B5F4;
	box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.settings__text{
	font-size: 1.7rem;
	color: #AE69C6;
	cursor: pointer;
}


.our-games{
	font-size: 2rem;
	color: #7f3e90;
}
/*.wfw{*/
/*  background: url(wfw.png) center center no-repeat;*/
/*}*/
.wfl{
	background: url(assets/wfl.png) center center no-repeat;
}
.crs{
	background: url(assets/crs.png) center center no-repeat;
}
.stm{
	background: url(assets/stm.png) center center no-repeat;
}
/*.tm{*/
/*  background: url(tm.png) center center no-repeat;*/
/*  border: 1px solid rgba(0,0,0,.05);*/
/*  border-left: 0;*/
/*  border-right: 0z§;*/
/*  border-radius: 6px;*/
/*}*/
.my-game{
	width: 140px;
	height: 80px;
	background-size: 100%;
}


@media (min-width: 1000px) {
	.settings__header{
		font-size: 2.9rem;

		margin-bottom: 20px;
	}
	.my-game{
		width: 180px;
		height: 100px;

	}
	.settings{
		width: 300px;
	}
	.levelsTop{
		height: 80px
	}
	.levelsTop__allStars{
		height: 70px;
		font-size: 3rem;
	}
	.levelsTop__allStars .menu-star {
		width: 30px;
		height: 30px;
	}
	.switchSettings, .leaderBoard, .switchShop{
		width: 60px;
		height: 60px;
	}
}

/*Реклама кроссвордов*/
.levels__loc{
	position: absolute;
	right: 7px;
	bottom: 7px;


	width: 28px;
	height: 28px;

	background-color: white;

	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 1.7rem;
	color: black;
	box-shadow: 0 0 6px rgba(0,0,0,0.2);
}
.levels__loc_big{
	font-size: 1.25rem;
}


@media (min-width: 1000px) {
	.levels__loc{
		width: 50px;
		height: 50px;
		right: 10px;
		bottom: 10px;
		font-size: 3rem;
	}
	.levels__loc_big{
		font-size: 2.6rem;
	}
}
.word-definition{
	overflow: auto;
	height: 80%;
	user-select: text;
}
.word-mean{
	overflow: hidden;
	font-size: 2rem;
}


@media (max-height: 350px) {
	.levelsTop__allStars{
		height: 40px;

	}

}
a{
	text-decoration: none;
}
b{
	font-weight: normal;
}
@media (max-height: 350px) {
	.levelsTop{
		height: 50px;
		width: 487px;
	}
	.levelsTop .menuItem {
		width: 40px;
		height: 40px;
	}
	.level{
		font-size: 2.5rem;
	}
	.levels-wrapper {
		margin-top: 45px;
		padding: 3px;
	}
	.next-location, .prev-location {
		width: 25px;
		height: 35px;
	}
	.shop{
		height: 280px;
	}
	.shop__cart__item_1, .shop__cart__item_2, .shop__cart__item_3, .shop__cart__item_4{
		max-height: 100px;
	}
	.shop__cart{
		height: 205px;
	}
}
.level__big{
	font-size: 2.2rem;
}
.levels-wrapper_bigLevels .level__big{
	font-size: 2rem;
}
@media (min-width: 1000px) {
	.level__big{
		font-size: 3.5rem;
	}
	.levels-wrapper_bigLevels .level__big{
		font-size: 3.4rem;
	}
}
.authText{
	text-decoration: underline;
}


.cloudHint{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 10px;

	width: 212px;
	height: 148px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	font-size: 1.6rem;
	color: #9C4B94;
	line-height: 2rem;

	padding: 24px 17px;

	background: url(assets/cloud.svg) center center no-repeat;
	background-size: 100%;

	z-index: 10;
}
.cloudHint_wordSelected{
	left: auto;
	right: 10px;
}
.cloudHint__mainText{
	color: #92378E;
	font-weight: bold;
}
.skipTutorial{
	position: absolute;
	right: 15px;
	top: 15px;

	font-size: 1.4rem;
	font-family: 'Roboto', sans-serif;
	color: white;

	background-color: #BF63C7;
	border-radius: 10px;
	padding: 2px 10px;

	z-index: 10;

	cursor: pointer;
}

@media (min-width: 1000px) {
	.menu{
		padding: 10px 0;
	}
	.cloudHint{
		width: 318px;
		height: 222px;
		font-size: 2.2rem;
		line-height: 2.5rem;
	}
	.skipTutorial{
		font-size: 2rem;
		padding: 4px 15px;
		border-radius: 15px;
	}
}
@media (min-width: 1250px) {
	.menu{
		width: 1200px;
		left: 50%;
		margin-left: -600px;
		justify-content: space-between;
	}
	.words{
		padding: 0;
	}
}


</style>
