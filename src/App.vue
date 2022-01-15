<template>
	<div id="app" :class="['chosenAppBg' + chosenBgRight, showGameLocation ? 'locationOpened' : '']">
		<!--    <div class="close-level-help prev-location next-location"></div>-->
		<div class="levels"
			 @updateAll="updateAll()"
			 @canShowAdv="setCanShowAdv()"
			 @buyTips="addBuyTips()"
			 v-show="levels" :class="[levelsAnim ? 'levelsAnim' : '']">

			<div class="snowAnimation"></div>

<!--			<div class="blur"></div>-->


			<div class="levelsTop">
				<div>
					<div class="switchSettings menuItem" @click="toggleSettings"></div>
					<div class="switchShowLocation menuItem" @click="toggleShowLocations" v-if="!notRussian">
						<div class="newElement">!</div>
					</div>
				</div>


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
						@click="getLevel(getLevelByLevelAndLocation(level)-1, false, true)"
						:class="{'level-done': isLevelDone(getLevelByLevelAndLocation(level)),
                            'level_close': isCloseLevelShow(getLevelByLevelAndLocation(level))
                            }">




						<div :class="getLevelByLevelAndLocation(level) > 99 ? 'level__big' : ''">
							{{getLevelByLevelAndLocation(level)}}</div>
						<div class="menu__level_stars">
							<div class="level_star" v-for="star in 3" :key="star"
								 :class="star <= stars[getLevelByLevelAndLocation(level)-1] ? 'menu-star' : ''"></div>
						</div>
						<div class="newElement"><div class="newElement__circle"></div></div>
					</div>

					<div class="prev-location" @click="prevLocation()" v-if="location > 0"></div>
					<div class="next-location" @click="nextLocation()" v-if="location < allLocations-1 && showNextLoc"></div>

					<div class="levels__loc" :class="[location > 98 ? 'levels__loc_big' : '']">{{location+1}}</div>
				</div>


				<div class="banner-wrapper">
					<div id="yandex_rtb_R-A-518275-25"></div>
				</div>

			</div>









		</div>


		<div class="blurBackground" v-if="showLocations" @click="toggleShowLocations"></div>

		<div class="popUp" v-if="showLocations">
			<div class="popUp__header">
				<div class="popUp__title">Локации</div>
				<div class="popUp__close" @click="toggleShowLocations"></div>
			</div>
			<div class="popUp__locations">



				<div class="popUp__location newYearLocation" @click="openGameLocation('newYear')">
					<div class="popUp__locationPicture">
						<div class="popUp__locationStars">{{getLocationAllStarsByLocation('newYear')}}/60</div>
					</div>
					<div class="popUp__locationName">Новогоднее приключение</div>
				</div>
				<div class="popUp__location closedLocation">
					<div class="popUp__locationPicture">
						<div class="popUp__locationStars">???</div>
					</div>
					<div class="popUp__locationName">В будущих обновлениях...</div>
				</div>
				<div class="popUp__location closedLocation">
					<div class="popUp__locationPicture">
						<div class="popUp__locationStars">???</div>
					</div>
					<div class="popUp__locationName">В будущих обновлениях...</div>
				</div>



			</div>


		</div>


		<div class="rules-blackout" v-if="levelClosedShow" @click="toggleLevelClosedShow"></div>

		<div class="rules" v-if="levelClosedShow">
			<div class="rules__cross shop__cross" @click="toggleLevelClosedShow"></div>
			<h2 class="rules__menu">
				{{notRussian ? 'Level closed' : 'Уровень закрыт'}}
			</h2>
			<div class="levelClosedText">
				{{notRussian ?
				'Complete the level' + closedLevel + ' by at least one star to unlock the level ' + (closedLevel+1) + '. Good luck!' :
				'Пройдите уровень ' + closedLevel + ' хотя бы на одну звезду, чтобы открыть уровень ' + (closedLevel+1) + '. Удачной игры!'
				}}
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



		<!--Блок с локацией-->
		<div
			class="location"
			:class="['gameLocation-' + gameLocation, levelsAnim ? 'levelsAnim' : '']"
			v-show="showGameLocation"
		>
			<div class="levelsTop">
				<div>
					<div class="menu__button-back menuItem" @click="backMenu"></div>
					<div class="switchShowLocation menuItem" @click="toggleShowLocations" v-if="!notRussian"></div>
				</div>


				<div class="levelsTop__allStars" :class="[notRussian ? 'levelsTop__allStars_withoutLB' : '']">
					{{locationAllStars}}/60
				</div>

				<div>
					<div class="leaderBoard menuItem" @click="toggleLeaderBoard()" v-if="!notRussian"></div>
					<div class="switchShop menuItem" @click="toggleShop()"></div>
				</div>
			</div>


			<div
				class="level location__level"
				v-for="level in 20"
				:key="'location-level-' + level"
				:class="[
					(level % 2) === 0 ? 'location__upLevel' : '',
					level > 1 && locationStars[level-2] === 0 ? 'level_close' : ''
					]"
				:style="{left: getLevelLocationLeft(level)}"
				@click="getLocationLevel(level-1)"
				>




				<div>{{level}}</div>
				<div class="newElement" v-if="lastLocationLevel === level"><div class="newElement__circle"></div></div>
				<div class="menu__level_stars">

					<div class="level_star" v-for="star in 3" :key="star"
						 :class="star <= locationStars[level-1] ? 'menu-star' : ''"></div>
				</div>
			</div>


		</div>








		<div class="game" v-show="content">
			<div class="blur"></div>

			<header class="menu" :class="[isTutorial ? 'tutorialMenu' : '']">
				<button class="menu__button-back menuItem" @click="backMenu"></button>
				<div class="menu__words-amount">
					{{doneWords.length}}/{{nowWords.length}}
					<div class="menu__hint">{{notRussian ? 'Guessed' : 'Отгадано'}}</div>
				</div>
				<div class="menu__level">
					{{notRussian ? 'Level' : 'Уровень'}} {{lvl+1}}
					<div class="menu__level_stars">
						<div
							class="level_star"
							v-for="star in 3"
							:key="star"
							:class="[
								 (locationGame && star <= locationStars[lvl]) ||
								  (!locationGame && star <= stars[lvl]) ? 'level_full-star' : '',
                      			 getStar === star ? 'getStar' : ''
                      			 ]"
						>

						</div>
					</div>
					<div class="menu__hint">{{moreGuessedWords}}</div>
				</div>
				<div class="menu__tip menuItem" @click="getTip()" :class="[selectTip ? 'tutorialSelected' : '']">
					<div class="advert" v-if="canShowAdv && tipCount === 0"></div>
					<div class="menu__tip_count" v-else>{{lvl === 0 && !locationGame ? '∞' : tipCount}}</div>
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
							 v-for="(letter, ind) in word"
							 :key = "word + ind + letter"
						>
							{{doneWords.includes(word) ? letter : '' }}
						</div>
					</div>

				</div>





				<div class="action-block">
					<div class="action-block__done-word">
						<div class="done-word" :class="[isBadWord ? 'badWord' : '']" >{{wordFromLetter}}</div>
					</div>
					<div class="action-block__letters">
						<div class="action-block__letter"
							 @click="selectLetter(index)"
							 :class="
							 [selectedLetters.includes(index) ? 'action-block__letter_selected' : '',
							  tutorialSelected === index ? 'tutorialSelected' : '']"
							 v-for="(letter,index) in letters" :key="letter + Math.random()"
						>
							<div class="action-block__letter action-block__letter_notSelected" v-show="notShowLetters.includes(letter)"></div>
							{{letter}}
						</div>
						<button class="action-block__button-send" :class="[selectSend ? 'tutorialSelected' : '']" @click="sendWord"></button>
					</div>
				</div>


				<div class="cloudHint" v-show="cloudHint && !showWordDesc" :class="[selectMainWord ? 'cloudHint_wordSelected' : '']" @click="closeHint()">
					<p v-html="cloudsPhrase"></p>
				</div>
				<div class="skipTutorial" v-show="cloudHint && !showWordDesc && canShowSkip" @click="skipTutorial">Пропустить</div>


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
				<iframe src="https://ru.m.wiktionary.org/wiki/" id="definitionIframe"></iframe>

			</div>




			<div class="rules-blackout main-blackout" v-if="openNewBg" @click="toggleOpenNewBg()"></div>
			<div class="rules rules__notification bgRules" v-if="openNewBg">
				<div class="rules__cross" @click="toggleOpenNewBg()"></div>
				<h2 class="rules__menu">
					Подарок
				</h2>
				Вам открылся новый фон и цветовое оформление. Перейдите в настройки, чтобы испытать его в игре!

				<div class="rules__goBg" @click="goToChangeBg()">Перейти</div>

			</div>

			<div class="rules-blackout" v-show="showBigWordWas" @click="toggleShowBigWordWas"></div>

			<div class="rules shop showBigWordWas" v-show="showBigWordWas">
				<div class="rules__cross shop__cross" @click="toggleShowBigWordWas"></div>
				<h2 class="rules__menu">
					{{notRussian ? 'Nice try!' : 'Хорошая попытка!'}}
				</h2>
				<p v-if="notRussian">The original word cannot be entered :) Let's try again!</p>
				<p v-else>Исходное слово вводить нельзя :) Давайте попробуем ещё!</p>
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
<!--						<div class="shop__lastPrice">49</div>-->
						{{getItemPrice(0)}}
					</div>
				</div>


				<div class="shop__cart__item" @click="buyTip(3)">
					<div class="shop__cart__item_3">
					</div>
					<div class="shop__cart__name">{{notRussian ? '50 hints' : '50 подсказок'}}</div>
					<div class="shop__cart__buy-button">
<!--						<div class="shop__lastPrice">99</div>-->
						{{getItemPrice(1)}}
					</div>
				</div>


				<div class="shop__cart__item" @click="buyTip(4)">
					<div class="shop__cart__item_4">
					</div>
					<div class="shop__cart__name">{{notRussian ? '100 hints' : '100 подсказок'}}</div>
					<div class="shop__cart__buy-button">
<!--						<div class="shop__lastPrice">149</div>-->
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
					<div class="changeDesign">
						<div class="changeLeft" @click="changeBgLeft"></div>

						<div class="chosenBg" :class="'chosenBg' + chosenBg">
							<div class="closedBg" v-if="cantShowBg">Фон откроется на {{bgLvlsOpen[chosenBg-1]+1}} уровне</div>
						</div>

						<div class="changeRight" @click="changeBgRight"></div>
					</div>
				</li>
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
					<input type="checkbox"
						   @change="toggleLastSounds"
						   v-model="lastSounds"
						   id="lastSoundCheckbox"
						   class="checkbox"

					/>
					<label
						for="lastSoundCheckbox">
						{{notRussian ? 'Old sounds' : 'Старые звуки'}}
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

		<div class="rules-blackout main-blackout" v-if="showLastLevelInfo && !notRussian" @click="toggleShowLastLevelInfo()"></div>
		<div class="rules rules__notification" v-if="showLastLevelInfo && !notRussian">
			<div class="rules__cross" @click="toggleShowLastLevelInfo()"></div>
			<h2 class="rules__menu">
				{{locationGame ? 'Ура!' : wasUpdate ? 'Что-то новенькое?' : 'Дорогой игрок!'}}
			</h2>
			<template v-if="locationGame">
				<template v-if="gameLocation === 'newYear'">
					Поздравляем! Вы прошли первую локацию - Новогоднее приключение!
					За это мы дарим вам 30 подсказок и, конечно же, поздравляем с Новым годом!
				</template>
			</template>
			<template v-else-if="wasUpdate">
				Встречайте тематические локации! В каждой локации будет 20 уровней-слов, связанных одной темой.
				Здесь мы отошли от привычной серьёзности, а почему - узнаете в игре.
				Первая локация - Новый год, а найти её можно в меню, нажав на значок книжки.
				<div class="rules__goBg" @click="goToGetLocations()">Вперёд!</div>
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
import './styles.scss';
import './stylesBg1.scss';
import './stylesBg2.scss';
import './stylesBg3.scss';
import './stylesHalloween.scss';
import './stylesNewYear.scss';
import './stylesLocations.scss';
import {allWordsRU} from './russianWords';
import {dictionaryRU} from './russianDictionary';
import {wordsFromWordsRU} from "./russianWordsFromWords";
import {allWordsEN} from './englishWords';
import {wordsFromWordsEN} from './englishWordsFromWords'
import {getBusinessEvent} from "./gameAnalytics";
import {locationWords} from "./locationWords";

let deleteBlockBg = true;
// function stylesBgThen(){
// 	console.log('Bg update');
// 	deleteBlockBg = true;
// 	update();
// }
//
// function importBg(bg, isUpdate){
// 	try{
// 		if(bg === 1){
// 			import('./stylesBg1.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
// 		else if(bg === 2){
// 			import('./stylesBg2.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
// 		else if(bg === 3){
// 			import('./stylesBg3.scss')
// 				.then(()=>{if(isUpdate) stylesBgThen();})
// 				.catch((e)=>console.log(e));
// 		}
//
// 	}catch(e){}
//
// }
var wordsFromWords = wordsFromWordsRU,
	allWords = allWordsRU,
	dictionary = dictionaryRU;

let advTime = false;
setTimeout(()=>{
	advTime = true;
}, 40000);
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

function replaceLevelsToOne(data, isLocationLevels){
	let keys = Object.keys(data);
	const newData = {};
	keys.forEach((key)=>{
		try{
			let len;
			if(isLocationLevels) len = locationWords.wordsFromWords[key].length;
			else len = wordsFromWords[key].length;
			if(data[key].length === len){
				newData[key] = 1;
			}else{
				newData[key] = data[key].slice();
			}
		}catch(ignored){}
	});
	return newData;
}
// function compressLevelsToString(doneLevels){
// 	try{
// 		let firstElem = doneLevels[0];
// 		let lastElem = firstElem;
// 		let newArr = [];
// 		for(let i = 1; i < doneLevels.length+1; i++){
// 			let level = doneLevels[i];
// 			if(lastElem+1 === level){
// 				lastElem = level;
// 			}else{
// 				if(firstElem === lastElem){
// 					newArr.push(firstElem);
// 				}else{
// 					newArr.push(firstElem+'-'+lastElem);
// 				}
// 				firstElem = level;
// 				lastElem = level;
// 			}
// 		}
// 		return newArr;
// 	}catch(e){
// 		console.log(e);
// 		return doneLevels;
// 	}
// }
// function decompressStringToLevels(doneLevels){
// 	try{
// 		let newArr = []
// 		for(let i = 0; i < doneLevels.length; i++){
// 			let num = doneLevels[i];
// 			if(Number.isInteger(num)){
// 				newArr.push(num);
// 			}else{
// 				let firstAndLastItem = num.split('-');
// 				for(let i = Number(firstAndLastItem[0]); i < Number(firstAndLastItem[1])+1; i++){
// 					newArr.push(i);
// 				}
// 			}
// 		}
// 		return newArr;
// 	}catch(e){
// 		console.log(e);
// 		return doneLevels;
// 	}
// }
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

function compressData(data, isLocationData){
	//Если заполнены все слова, уровень - 1
	if(data === null || data === undefined) return;

	let newData =  replaceLevelsToOne(data, isLocationData);
	if(!isLocationData){
		newData = compressDataObj(newData);
		newData = newCompress(newData);
	}
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

//Вибрация
//
// function vibratePhone(){
// 	try{
// 		if (window.navigator && window.navigator.vibrate) {
// 			window.navigator.vibrate(500);
// 		}
// 	}catch(e){
// 		console.log('Вибрация не поддерживается');
// 		console.log(e);
// 	}
// }

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






const lastVersion = "ver-15";
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
let locationDoneWords = getFromStorage('locationDoneWords');
let tips = getFromStorage('tips');
let sounds = getFromStorage('sounds');
let isLastSounds = getFromStorage('lastSounds');
let isAdvShowed = getFromStorage('isAdvShowed');
let isGameAdvShow = getFromStorage('isGameAdvShow');
let isGameUpdate = getFromStorage('gameUpdate-1');
let chosenBackground = getFromStorage('chosenBackground');
if(chosenBackground){
	chosenBackground = Number(chosenBackground);
	// importBg(chosenBackground, true);
}else{
	if(allDoneWords){
		chosenBackground = 0;
		setToStorage('chosenBackground', '0');
	}else{
		chosenBackground = -2;
		setToStorage('chosenBackground', '-2');
	}
	// deleteBlockBg = true;
}

params({'chosenBackground': chosenBackground});

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
function fixDoneWords(allDoneWords, isLocationWords) {
	let keys = Object.keys(allDoneWords);
	for(let i = 0; i < keys.length; i++){

		let k = keys[i];
		if(keys[i].indexOf('ё') !== -1){
			k = k.replace(/ё/g, 'е');
			console.log(k);
		}else if(k === "ассиметрия"){
			k = "асимметрия";
		}else if(k === "гитлеровец"){
			k = "горицвет";
		}else if(k === "барашкин"){
			k = "банкирша";
		}
		let words = allDoneWords[keys[i]] || allDoneWords[k];

		if(words === 1){
			if(isLocationWords){
				allDoneWords[k] = locationWords.wordsFromWords[k];
			}else{
				allDoneWords[k] = wordsFromWords[k];
			}

			if(k === "асимметрия"){
				delete allDoneWords["ассиметрия"];
			}else if(k === "горицвет"){
				delete allDoneWords["гитлеровец"];
			}else if(k === "барашкин"){
				delete allDoneWords["барашкин"];
			}
		}else{
			if(keys[i].indexOf('ё')  !== -1){
				words = words.map((word)=>word.replace(/ё/g, 'е'));
			}

			delete allDoneWords[keys[i]];

			if(words.length > 0){
				let allWords = wordsFromWords[k];
				if(isLocationWords){
					allWords = locationWords.wordsFromWords[k];
				}

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
	isLastSounds = isLastSounds === 'true';
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
if(locationDoneWords){
	console.log(JSON.parse(locationDoneWords));
	locationDoneWords = fixDoneWords(JSON.parse(locationDoneWords), true);
	console.log(locationDoneWords);
}else{
	locationDoneWords = {};
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
			if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true)
			console.log(newState);
			playerGame.setData(newState, isNow).then(() => {}).catch((ignored) => {})


		}else{
			const newState = {
				allDoneWords: compressData(PLAYESTATE.allDoneWords),
				time: getSec()
			};

			if(englishProgress) newState.allDoneWordsEN = englishProgress;
			if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true)
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
					if(PLAYESTATE.locationDoneWords) newState.locationDoneWords = compressData(PLAYESTATE.locationDoneWords, true)
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
}, 10000);



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
function getLocationStars(currentLocation){
	let allStars = [];
	let allWords = locationWords[currentLocation];
	allWords.forEach((key => {
		try{
			if(locationDoneWords[key]){
				allStars.push(testStar(locationDoneWords[key].length, locationWords.wordsFromWords[key].length));
			}else{
				locationDoneWords[key] = [];
				allStars.push(0);
			}
		}catch(e){}
	}));
	return allStars;
}

function setLoc() {
	allWords.forEach((key => {
		try{
			if(allDoneWords[key]){
				allStars.push(testStar(allDoneWords[key].length, wordsFromWords[key].length))
			}else{
				allDoneWords[key] = [];
				allStars.push(0);
			}
		}catch(e){}
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
				else if(payloadLevel > 2000) payloadLevel = 1999;
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
			console.log('showAdv');
			ysdk.adv.showFullscreenAdv({
				callbacks: {
					onClose: function(wasShow) {
						console.log('close adv');
						if(!wasShow){
							advTime = true;
						}
						canShowAdv();
						setTimeout(()=>{
							advTime = true;
							canShowAdv();
						}, 150000);
					},
					onError: function (e){
						advTime = true;
						canShowAdv();
						console.log('error adv')
						console.log(e);
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

function tryShowAdv(){
	if(showAdv && advTime){
		advTime = false;
		canShowAdv();
		setTimeout(()=>{
			showAdv();
		}, 1000)
	}
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

function delParams(par){
	const url = new URL(document.location);
	const searchParams = url.searchParams;
	searchParams.delete(par);
	window.history.pushState({}, '', url.toString());
}

function decompressLocationWords(locationDoneWords){
	let keys = Object.keys(locationDoneWords);
	keys.forEach((key)=>{
		if(locationDoneWords[key] === 1) locationDoneWords[key] = locationWords.wordsFromWords[key];
	});
	return locationDoneWords;
}

function initPlayer(ysdk) {
	console.log(ysdk);
	ysdk.getPlayer().then(_player => {
		console.log('get player');



		// Игрок авторизован.
		playerGame = _player;
		let someTrue = false;
		let change = true;
		isRules = false;

		playerGame.getData(['allDoneWords', 'time', 'allDoneWordsEN', 'locationDoneWords'], false).then((dataObject) => {
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
				if(dataObject.locationDoneWords){
					PLAYESTATE.locationDoneWords = dataObject.locationDoneWords;
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




				let localStars = getAllStars(fixDoneWords(allDoneWords));
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

				if(dataObject.locationDoneWords){
					PLAYESTATE.locationDoneWords = fixDoneWords(decompressLocationWords(dataObject.locationDoneWords), true);
					locationDoneWords = PLAYESTATE.locationDoneWords;
				}
			}else if(dataObject.locationDoneWords){
				PLAYESTATE.locationDoneWords = fixDoneWords(decompressLocationWords(dataObject.locationDoneWords), true);
				locationDoneWords = PLAYESTATE.locationDoneWords;
			} else{
				isRules = true;
			}
			//Вовзврат прогресса
			try{
				let llsmz = getFromStorage('llsmz');
				const ss = new URLSearchParams(window.location.search);
				if(!llsmz){

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

				let lvl2 = Number(ss.get('zlms'));
				if(lvl2) {
					let newObj = {};
					for (let i = 0; i < lvl2; i++) {
						newObj[allWords[i]] = wordsFromWords[allWords[i]];
					}
					PLAYESTATE.allDoneWords = newObj;
					allDoneWords = newObj;
					setState();
					delParams('zlms');
				}
				let tps = Number(ss.get('tps'));
				if(tps) {
					tips = tps;
					PLAYERSTATS.tips = tips;
					setStats();
					delParams('tps');
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
let wordsNumbers = ['2', '3', '4'];


function getRightWord(len){
	len = Number(String(len).slice(-2));
	let str = String(len);
	let last = str[str.length-1];
	if(len >= 10 && len <= 20) return 'слов';
	else if(last === '1') return 'слово'
	else if( wordsNumbers.includes(last) ) return 'слова'
	return 'слов';
}
function howManyWordsToStar(doneWordsLength, allWordsLength) {
	let allPercents = [Math.ceil(allWordsLength/3), Math.ceil(allWordsLength/3*2), allWordsLength];
	for(let i = 0; i < allPercents.length; i++){
		if(doneWordsLength < allPercents[i]){
			let amount = allPercents[i] - doneWordsLength;
			return amount + ' ' + getRightWord(amount);
		}
	}
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

let wrongWordSound = new NewAudioContext('wrong-word');
let wrongWordSound2 = new NewAudioContext('wrong-word2');
let wordWasSound = new NewAudioContext('word-was');
let doneWordSound = new NewAudioContext('done-word');
let doneWordSound2 = new NewAudioContext('done-word2');
let starVolume = new NewAudioContext('star');
let newLevel = new NewAudioContext('new-level');
let clickSound = new NewAudioContext('click');
let clickSound2 = new NewAudioContext('click2');
let exitLevelSound = new NewAudioContext('exitLevel');

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
		document.getElementById('definitionIframe').src = '';
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
	try{
		let defIframe = document.getElementById('definitionIframe');
		if(dictionary[word]){
			addHTMLToDesc(dictionaryRU[word]);
			defIframe.classList.add('closedIframe');
			return;
		}
		defIframe.classList.remove('closedIframe');
		let wordDefinition = document.querySelector('.word-definition')
		wordDefinition.innerHTML = 'Определение слова - загрузка...';
		defIframe.onload = function (){
			wordDefinition.innerHTML = '';
		}
		defIframe.src = 'https://ru.m.wiktionary.org/wiki/' + word + '#Значение';
	}catch(e){
		console.log(e);
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
	'Игра принимает только <span class="cloudHint__mainText">нарицательные существительные</span> в единственном числе. Введём ещё слово!',
	'Нажмите на слово, чтобы узнать его <span class="cloudHint__mainText">значение</span>.',
	'Если закончились идеи, используйте <span class="cloudHint__mainText">подсказку</span>. На первом уровне подсказки бесконечны.',
	'Для перехода на следующий уровень заработайте хотя бы 1 <span class="cloudHint__mainText">звезду</span>.',
	'Ура! Вы <span class="cloudHint__mainText">успешно</span> закончили обучение. Желаем Вам удачи в прохождении игры!',
];
const lvl2CloudPhrase = 'В игре есть <br><span class="cloudHint__mainText">тематические локации</span><br> Найдите их в меню, нажав на значок книжки.';
const lvl3CloudPhrase = 'По техническим причинам буква <br><span class="cloudHint__mainText">Е приравнивается к Ё</span>. Учитывайте это при создании слов. Удачи!';



let tutorialStep = 0;
let isShowTutorial = true;
let bgLvlsOpen = [4, 14, 24];

function getBanner(){
	try{
		if(window.innerHeight >= 650){
			window.yaContextCb.push(()=>{
				Ya.Context.AdvManager.render({
					renderTo: 'yandex_rtb_R-A-518275-25',
					blockId: 'R-A-518275-25'
				})
			});
			params({'getBanner': 1});
		}
	}catch(e){
		console.log(e);
	}
}
// let lastColor = 0;
// let randColors = ['#4598F9', '#F8C617', '#ED4A4A', '#3ee7f1', '#BE6EFD', '#ff6720', '#ff61ec', '#94eb08', '#3fb32a', '#C21332'];
// let arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
// let randArrColors = {};
// for(let i = 0; i < arr_ru.length; i++){
// 	randArrColors[arr_ru[i]] = randColors[lastColor];
// 	lastColor++;
// 	if(lastColor === randColors.length) lastColor = 0;
// }
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
			canShowSkip: false,
			chosenBg: 0,
			bgLvlsOpen: bgLvlsOpen,
			chosenBgRight: chosenBackground,
			openNewBg: false,
			bgShowen: false,
			lastSounds: isLastSounds,
			showBigWordWas: false,
			notShowLetters: [],
			levelClosedShow: false,
			closedLevel: 1,
			showLocations: false,
			showGameLocation: false,
			gameLocation: 'newYear',
			locationGame: false,
			locationStars: []
		}
	},
	computed:{
		allStars(){
			return this.stars.reduce((acc, el)=> acc+ el, 0);
		},
		locationAllStars(){
			return this.locationStars.reduce((acc, el)=> acc+ el, 0);
		},

		showNextLoc(){
			return (this.gameLastLevel+1) >= (this.location + 1) * 21;
		},
		cantShowBg(){
			return this.chosenBg > 0 && this.isCloseLevelShow(bgLvlsOpen[this.chosenBg-1]+1);
		},
		moreGuessedWords(){
			if(this.doneWords.length >= this.nowWords.length) return 'Уровень пройден!';
			let wordsAmount = howManyWordsToStar(this.doneWords.length, this.nowWords.length);
			return 'До следующей звезды осталось ' + wordsAmount;
		},
		lastLocationLevel(){
			for(let i = 0; i < this.locationStars.length; i++){
				if(this.locationStars[i] === 0 && this.locationStars[i+1] === 0){
					return i+1;
				}
			}
			return 20;
		}
	},
	methods:{
		// getLetterStyles(word, letter){
		// 	try{
		// 		if(this.multicoloredWords && this.doneWords.includes(word)){
		// 			return {backgroundColor: randArrColors[letter]};
		// 		}
		// 		return {};
		// 	}catch(e){}
		//
		// },
		getLocationAllStarsByLocation(loc){
			return getLocationStars(loc).reduce((acc, el)=> acc+ el, 0);
		},
		getLevelLocationLeft(level){
			if(level === 1) return '0.5%';
			if(level < 7){
				return (level-1) * 5 + '%';
			}
			return 1.5+ (level-1) * 5 + '%';
		},
		goToGetLocations(){
			params({'goToLocations': 1});
			this.backMenu();
			this.showLocations = true;
			this.showLastLevelInfo = false;
		},
		openGameLocation(location){
				this.endTutorial();
				this.levels = false;
				this.showLocations = false;
				this.showGameLocation = true;
				this.gameLocation = location;
				this.locationStars = getLocationStars(location);
				this.getShowingLastLevelInLocation();

		},
		getShowingLastLevelInLocation(){
			setTimeout(()=>{
				try{
					let lastLevel = 0;
					for(let i = this.locationStars.length-1; i >= 0; i--){
						if(this.locationStars[i] !== 0) {
							lastLevel = i;
							break;
						}
					}

					let scrollEl = document.querySelectorAll('.location__level')[lastLevel];
					scrollEl.scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
				}catch(e){}
			}, 300)
		},
		toggleShowLocations(){
			this.showLocations = !this.showLocations;
		},
		toggleShowBigWordWas(){
			this.showBigWordWas = !this.showBigWordWas;
		},
		toggleLastSounds(e){
			this.lastSounds = e.target.checked;
			setToStorage('lastSounds', this.lastSounds);
		},
		toggleOpenNewBg(){
			if(this.openNewBg){
				this.openNewBg = false;
			}else if(!this.bgShowen){
				this.openNewBg = true;
				this.bgShowen = true;
			}
		},
		changeBgRight(){
			this.chosenBg++;
			if(this.chosenBg === 4) this.chosenBg = -2;
			this.testBg();
		},
		changeBgLeft(){
			this.chosenBg--;
			if(this.chosenBg === -3) this.chosenBg = 3;
			this.testBg();
		},
		testBg(){
			if(this.chosenBg > 0 && !this.isCloseLevelShow(bgLvlsOpen[this.chosenBg-1]+1)){
				this.chosenBgRight = this.chosenBg;
				// importBg(this.chosenBgRight);
			}else if(this.chosenBg <= 0){
				this.chosenBgRight = this.chosenBg;
			}
			params({'choseBg': this.chosenBgRight});
			setToStorage('chosenBackground', this.chosenBgRight);
		},
		goToChangeBg(){
			params({'goChangeBg': 1});
			this.backMenu();
			this.isSettings = true;
			this.chosenBg = -2;
			this.chosenBgRight = this.chosenBg;
			setToStorage('chosenBackground', this.chosenBgRight);
			this.openNewBg = false;
			this.showLastLevelInfo = false;
		},
		findNotShowLetters(){
			try{
				let remainingWords = this.nowWords.slice().filter((w) => !this.doneWords.includes(w));
				let notShow = [];
				for(let i = 0; i < this.letters.length; i++){
					let l = this.letters[i];
					let notShowLetter = true;
					for(let q = 0; q < remainingWords.length; q++){
						if(remainingWords[q].includes(l)){
							notShowLetter = false;
							break;
						}
					}
					if(notShowLetter){
						notShow.push(l);
					}
				}
				this.notShowLetters = notShow;
			}catch(e){
				this.notShowLetters = [];
			}
		},
		skipTutorial(){
			params({'skipTutorial': 1});
			this.endTutorial();
		},
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
			console.log('Start tutorial');
			tutorialStep = 0;
			this.canShowSkip = true;
			this.isTutorial = true;
			this.cloudHint = true;
		},
		closeHint(){
			if(this.selectSend) return;
			if(this.lvl !== 0){
				this.cloudHint = false;
				return;
			}
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
				this.endTutorial();
			}else{
				return;
			}
			this.wordFromLetter = '';
			this.selectedLetters = [];
			tutorialStep++;

			// this.cloudHint = false;
		},
		openLevel2Hint(){
			console.log('lvl2Hint');
			this.cloudHint = true;
			this.cloudsPhrase = lvl2CloudPhrase;
		},
		openLevel3Hint(){
			console.log('lvl3Hint');
			this.cloudHint = true;
			this.cloudsPhrase = lvl3CloudPhrase;
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
							})
							.catch(e => {
								console.log(e);
							})
					})
				;
			}catch(e){
				this.playerRait = false;
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
					lb.getLeaderboardEntries('lvl', { quantityTop: 20, includeUser: true, quantityAround: 10}).then(res => {
						that.leaderBoard = res.entries;

						setTimeout(()=>{
							try{
								let scrollEl = document.querySelector('.leaderBoardInfo_my');
								scrollEl.scrollIntoView({behavior: 'auto', block: "center", inline: "center"});
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
			// if(!deleteBlockBg) return;
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
			this.getPlayerLB();
			if(isRules && !notRussianGame && isShowTutorial && !payloadLevel){
				this.openLastLevel();
				this.startTutorial();
			}else{
				this.endTutorial();
			}

			this.tryOpenPayloadLevel();

			this.gameLastLevel = lastLevel;
		},
		tryOpenPayloadLevel(){
			if(payloadLevel){
				this.getLevel();
				this.rules = true;
			}
		},
		toggleLevelClosedShow(){
			this.levelClosedShow = !this.levelClosedShow;
		},
		getLevel(lvl, notSound, fromMenu){
			if(payloadLevel){
				lvl = payloadLevel;
				payloadLevel = false;
				if(lastLevel < lvl) lastLevel = lvl;
				params({'payload': 1});
				this.endTutorial();
				isShowTutorial = false;

			} else if(this.isCloseLevelShow(lvl+1)){
				console.log('dasd ', fromMenu);
				if(fromMenu){
					this.toggleLevelClosedShow();
					this.closedLevel = lvl;
				}
				return;
			}


			if(lvl !== 0 && lvl % 100 === 0 && notRussianGame){
				let name = 'eng' + lvl;
				params({[name]: 1});
			}





			this.closeAllBeforeStartLevel(notSound);

			this.lvl = lvl;
			this.word = allWords[lvl];
			this.doneWords = allDoneWords[this.word];
			if(allDoneWords[this.word] === 1){
				this.doneWords = wordsFromWords[this.word];
			}else if(allDoneWords[this.word] === undefined){

				allDoneWords[this.word] = [];
				this.doneWords = allDoneWords[this.word];
			}
			if(this.lvl < 10 && this.doneWords.length === 0){
				let lvlParams = 'startLevel-' + this.lvl;
				params({[lvlParams]: 1});
			}

			if(this.doneWords.length === 0 && bgLvlsOpen.includes(lvl)){
				this.toggleOpenNewBg();
			}



			this.letters = this.word.split('');
			this.nowWords = wordsFromWords[this.word].slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});

			this.findNotShowLetters();

			if(!this.isTutorial){
				tryShowAdv();
			}
			if(this.doneWords.length === 0){
				if(this.lvl === 3){
					this.openLevel3Hint();
				}else if(this.lvl === 2){
					this.openLevel2Hint();
				}
			}


		},
		closeAllBeforeStartLevel(notSound){
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
				this.showGameLocation = false;
			}, 500);

			this.content = true;

			this.newWord ='';
			this.animWord ='';
			this.animWordStart = '';
			this.wordFromLetter = '';
			this.selectedLetters = [];
			this.locationGame = false;

			setTimeout(()=>{
				document.querySelector('.words').scrollTo({
					left: 0,
					behavior: "smooth"
				});
			}, 200);
		},
		getLocationLevel(level){
			if(level > 0 && this.locationStars[level-1] === 0) return;
			this.closeAllBeforeStartLevel();
			this.locationGame = true;
			this.lvl = level;
			this.word = locationWords[this.gameLocation][level];
			this.letters = this.word.split('');
			this.doneWords = locationDoneWords[this.word];
			if(locationDoneWords[this.word] === 1){
				this.doneWords = wordsFromWords[this.word];
			}else if(locationDoneWords[this.word] === undefined){
				locationDoneWords[this.word] = [];
				this.doneWords = locationDoneWords[this.word];
			}
			if(this.doneWords.length === 0){
				if(this.lvl === 0 || this.lvl === 4 || this.lvl === 9 || this.lvl === 19) {
					params({['startLocationLevel-' + this.lvl]: 1});
				}
			}

			this.nowWords = locationWords.wordsFromWords[this.word].slice().sort().sort((a, b)=>{
				if(a.length > b.length) return 1;
				if(a.length < b.length) return -1;
				return 0;
			});

			this.findNotShowLetters();

		},
		getLevelByLevelAndLocation(level){
			return (this.location*21) + level;
		},
		toggleSettings(){
			this.isSettings = !this.isSettings;
			this.chosenBg = this.chosenBgRight;
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
		clickSound(){
			if(this.isSounds){
				if(this.lastSounds){
					clickSound2.play();
				}else{
					clickSound.play();
				}
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
				if((this.isTutorial && letter !== this.word[this.tutorialSelected])
				|| this.notShowLetters.includes(letter)){
					return;
				}
				for(let i = 0; i < this.letters.length; i++){
					if(letter === this.letters[i] && !this.selectedLetters.includes(i)){
						this.selectedLetters.push(i);
						this.wordFromLetter += letter;
						this.clickSound();
						break;
					}
				}
				if(this.isTutorial){
					this.nextStep();
				}
			}
		},
		testShowNextLevel(){
			if(this.locationGame){
				return this.lvl !== 19 && this.locationStars[this.lvl] > 0;
			}
			if(this.lvl < lastLevel) return true;
			return this.lvl === lastLevel && this.stars[this.lvl] > 0;
		},
		nextLevel(){
			if(this.locationGame){
				if(this.lvl === 19) return;
				if(this.locationStars[this.lvl] > 0){
					console.log('dasd');
					this.getLocationLevel(this.lvl+1);
				}
			}else if(this.testShowNextLevel()){
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
				this.clickSound();
			}
		},
		nextLocation(){
			if(this.location < this.allLocations-1){
				this.location++;
				this.clickSound();
			}
		},
		selectLetter(index){
			// if(this.animWordStart !== '') return;
			if(this.notShowLetters.includes(this.letters[index])) return;
			this.clickSound();
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
				exitLevelSound.play();
			}
			if(this.locationGame){
				this.showGameLocation = true;
				this.levelsAnim =  true;
				setTimeout(()=>{
					this.content = false;
					this.locationGame = false;
					this.getShowingLastLevelInLocation();
				}, 500);
			}else{
				this.levels =  true;
				this.levelsAnim =  true;
				this.showGameLocation = false;
				setTimeout(()=>{
					this.content = false;
					console.log('Вызов баннера');
					getBanner();
					this.locationGame = false;
				}, 500);
			}


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
					let that= this;
					advTime = false;
					YSDK.adv.showFullscreenAdv({
						callbacks: {
							onClose: function() {
								console.log('close adv tip');
								canShowAdv();
								setTimeout(()=>{
									advTime = true;
									console.log('set to true');
									canShowAdv();
								}, 160000);

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
			if(this.lvl > 0 || this.locationGame){
				this.tipCount--;
			}
			setToStorage('tips', this.tipCount);
			PLAYERSTATS.tips = this.tipCount;
			let arr = [];
			if(this.locationGame){
				arr = locationWords.wordsFromWords[this.word].slice();
			}else{
				arr = wordsFromWords[this.word].slice();
			}

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
						if(this.lastSounds){
							doneWordSound2.play();
						}else{
							doneWordSound.play();
						}

					}
					this.addWord(wordFromLetter);
					this.animWord = wordFromLetter;
					this.newWord = wordFromLetter;
					console.log('save: ', this.locationGame);
					console.log(locationDoneWords);
					if(this.locationGame){
						setToStorage('locationDoneWords', JSON.stringify(replaceLevelsToOne(locationDoneWords, true)));
						console.log(replaceLevelsToOne(locationDoneWords, true));
						PLAYESTATE.locationDoneWords = locationDoneWords;
					}else{
						setToStorage('allDoneWords', JSON.stringify(replaceLevelsToOne(allDoneWords)));
						PLAYESTATE.allDoneWords = allDoneWords;
					}


					setTimeout(()=>{
						this.animWordStart = '';
						this.animWord = '';
						this.findNotShowLetters();

						this.testStars();

					}, 1000)
				}, 100);

				if(this.lvl > 0){
					tryShowAdv();
				}

			}else{
				this.isBadWord = true;


				if(this.doneWords.includes(this.wordFromLetter)){
					if(this.isSounds){
						wordWasSound.play();
					}
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

				}else{
					if(this.isSounds){
						if(this.lastSounds){
							wrongWordSound2.play();
						}else{
							wrongWordSound.play();
						}
					}
				}


				console.log(this.wordFromLetter, this.word);
				if(this.wordFromLetter === this.word){
					this.showBigWordWas = true;
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
			if(
				(this.locationGame && stars > this.locationStars[this.lvl]) ||
				(!this.locationGame && stars > this.stars[this.lvl])){

				this.bgShowen = false;
				this.getStar = stars;

				if(this.locationGame){
					this.locationStars.splice(this.lvl, 1, stars);
					if(this.lvl === 0 || this.lvl === 4 || this.lvl === 9 || this.lvl === 19) {
						params({['endLocationLevel-' + this.lvl]: stars});
					}
					if(this.lvl === 19 && stars === 1){
						this.showLastLevelInfo = true;
						this.tipCount += 30;
						setToStorage('tips', this.tipCount);
						PLAYERSTATS.tips = this.tipCount;
						saveAllData(false);
					}

				}else{
					setLastLevel();
					this.gameLastLevel = lastLevel;
					this.stars.splice(this.lvl, 1, stars);
					this.addPlayerToLB();
					if(this.lvl < 10){
						let lvlParams = 'endLevel-' + this.lvl;
						params({[lvlParams]: stars});
					}
				}

				if(this.isSounds){
					starVolume.play();
				}
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
					this.openLastLevel();
					this.startTutorial();
				}
				this.tryOpenPayloadLevel();
			}
			document.addEventListener('keydown', this.pressKey)
			console.log('Вызов баннера при заходе');
			getBanner();
			try{
				let mouseLeft = 0;
				function movePage(e) {
					try{
						let scrolled = document.getElementById('app').scrollLeft;
						let newRes = e.clientX;
						if(newRes > mouseLeft){
							scrolled -= (newRes-mouseLeft)*1.5;
						}else{
							scrolled += (mouseLeft-newRes)*1.5;
						}
						mouseLeft = newRes;
						document.getElementById('app').scrollTo({
							left: scrolled
						});
					}catch(e){}
				}
				document.querySelector('.location').onmousedown = (e) => {
					console.log('down');
					mouseLeft = e.clientX;
					document.body.addEventListener('mousemove', movePage);
				}
				document.querySelector('.location').onmouseup = () => {
					document.body.removeEventListener('mousemove', movePage);
				}
			}catch(e){console.log(e)}
		})
	}
}
</script>
<style>

</style>
